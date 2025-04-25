import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Image, Modal, TouchableOpacity, Dimensions, Alert } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { Appbar, Button, Card, Avatar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

// Farm locations with associated images
const FARM_LOCATIONS = [
    {
        id: 1,
        title: "شمالی کھیت", // Northern Field
        coordinates: { latitude: 25.2054074, longitude: 68.2526513 },
        image: require('../assets/images/ndvi.jpg'),
        description: "فصل کی صحت کی تصویر", // Crop Health Image
    },
    {
        id: 2,
        title: "جنوبی کھیت", // Southern Field
        coordinates: { latitude: 25.2061443, longitude: 68.2535854 },
        image: require('../assets/images/farm.jpg'),
        description: "کیڑے متاثر حصہ", // Pest Affected Area
    },
    // Add more locations as needed
];

// Hardcoded drone location (can be updated later with real data)
const DRONE_LOCATION = {
    latitude: 24.9172,
    longitude: 67.0978,
};

export default function MapScreen() {
    const router = useRouter();
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<any>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const mapRef = useRef<MapView>(null);

    useEffect(() => {
        (async () => {
            // Request location permissions
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('کھیت کے نقشے کے لیے لوکیشن پرمیشن ضروری ہے');
                return;
            }

            // Get current location
            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation);

            // Watch position updates
            const locationSubscription = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.Highest,
                    distanceInterval: 1, // update if moved by 1 meter
                    timeInterval: 1000 // update every second
                },
                newLocation => {
                    setLocation(newLocation);
                }
            );

            // Clean up subscription on unmount
            return () => {
                if (locationSubscription) {
                    locationSubscription.remove();
                }
            };
        })();
    }, []);

    const handleMarkerPress = (location: any) => {
        setSelectedLocation(location);
        setModalVisible(true);
    };

    const centerOnUser = () => {
        if (location && mapRef.current) {
            mapRef.current.animateToRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
            });
        }
    };

    const centerOnDrone = () => {
        if (mapRef.current) {
            mapRef.current.animateToRegion({
                latitude: DRONE_LOCATION.latitude,
                longitude: DRONE_LOCATION.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
            });
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* App Bar */}
            <Appbar.Header style={styles.appbar}>
                <Appbar.BackAction onPress={() => router.back()} color="#EDF1D6" />
                <Appbar.Content
                    title="کھیت کا نقشہ"
                    titleStyle={styles.appbarTitle}
                    subtitle="جی پی ایس ٹریکنگ"
                    subtitleStyle={styles.appbarSubtitle}
                />
                <Appbar.Action
                    icon="drone"
                    color="#EDF1D6"
                    size={28}
                    onPress={centerOnDrone}
                />
            </Appbar.Header>

            <View style={styles.container}>
                {errorMsg ? (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{errorMsg}</Text>
                        <Button
                            mode="contained"
                            onPress={() => Location.requestForegroundPermissionsAsync()}
                            style={styles.retryButton}
                        >
                            دوبارہ کوشش کریں
                        </Button>
                    </View>
                ) : (
                    <>
                        <MapView
                            ref={mapRef}
                            style={styles.map}
                            provider={PROVIDER_GOOGLE}
                            initialRegion={{
                                latitude: 24.9172, // Default coordinates (can be your farm's center)
                                longitude: 67.0978,
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01,
                            }}
                            showsUserLocation={true}
                            showsMyLocationButton={false}
                            followsUserLocation={true}
                        >
                            {/* Drone Marker */}
                            <Marker
                                coordinate={DRONE_LOCATION}
                                title="ڈرون لوکیشن"
                                description="آپ کا ڈرون یہاں موجود ہے"
                            >
                                <View style={styles.droneMarkerContainer}>
                                    <MaterialCommunityIcons name="drone" size={36} color="#40513B" />
                                </View>
                                <Callout tooltip>
                                    <View style={styles.calloutContainer}>
                                        <Text style={styles.calloutTitle}>آپ کا ڈرون</Text>
                                        <Text style={styles.calloutText}>بیٹری: 75%</Text>
                                        <Text style={styles.calloutText}>اونچائی: 25m</Text>
                                    </View>
                                </Callout>
                            </Marker>

                            {/* Farm Area Markers */}
                            {FARM_LOCATIONS.map(farmLocation => (
                                <Marker
                                    key={farmLocation.id}
                                    coordinate={farmLocation.coordinates}
                                    title={farmLocation.title}
                                    description={farmLocation.description}
                                    onPress={() => handleMarkerPress(farmLocation)}
                                >
                                    <View style={styles.farmMarkerContainer}>
                                        <MaterialCommunityIcons name="map-marker" size={36} color="#609966" />
                                    </View>
                                </Marker>
                            ))}
                        </MapView>

                        {/* Action buttons */}
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={centerOnUser}
                            >
                                <MaterialCommunityIcons name="crosshairs-gps" size={28} color="#FFFFFF" />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={() => {
                                    // You could add a function to send drone to user's location here
                                    Alert.alert(
                                        "ڈرون بھیجیں",
                                        "کیا آپ اپنے موجودہ مقام پر ڈرون بھیجنا چاہتے ہیں؟",
                                        [
                                            { text: "نہیں", style: "cancel" },
                                            { text: "ہاں", onPress: () => console.log("Sending drone to user location") }
                                        ]
                                    );
                                }}
                            >
                                <MaterialCommunityIcons name="send" size={28} color="#FFFFFF" />
                            </TouchableOpacity>
                        </View>

                        {/* Image Modal */}
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => setModalVisible(false)}
                        >
                            <View style={styles.modalContainer}>
                                <View style={styles.modalContent}>
                                    <TouchableOpacity
                                        style={styles.closeButton}
                                        onPress={() => setModalVisible(false)}
                                    >
                                        <MaterialCommunityIcons name="close" size={28} color="#40513B" />
                                    </TouchableOpacity>

                                    {selectedLocation && (
                                        <>
                                            <Text style={styles.modalTitle}>{selectedLocation.title}</Text>
                                            <Image
                                                source={selectedLocation.image}
                                                style={styles.modalImage}
                                                resizeMode="contain"
                                            />
                                            <Text style={styles.modalDescription}>{selectedLocation.description}</Text>

                                            <Button
                                                mode="contained"
                                                style={styles.modalButton}
                                                onPress={() => {
                                                    // Add functionality to send drone to this location
                                                    setModalVisible(false);
                                                }}
                                            >
                                                اس مقام پر ڈرون بھیجیں
                                            </Button>
                                        </>
                                    )}
                                </View>
                            </View>
                        </Modal>
                    </>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#EDF1D6",
    },
    container: {
        flex: 1,
        backgroundColor: "#EDF1D6",
    },
    appbar: {
        backgroundColor: "#40513B",
        paddingHorizontal: 16,
        elevation: 4,
        height: 60,
    },
    appbarTitle: {
        fontFamily: "NotoNastaliqUrdu-Bold",
        fontSize: 22,
        color: "#EDF1D6",
        textAlign: "right",
    },
    appbarSubtitle: {
        fontFamily: "NotoNastaliqUrdu-Regular",
        fontSize: 14,
        color: "#EDF1D6",
        opacity: 0.8,
        textAlign: "right",
    },
    map: {
        width: '100%',
        height: '100%',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontFamily: "NotoNastaliqUrdu-Medium",
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        color: '#40513B',
    },
    retryButton: {
        backgroundColor: "#609966",
        borderRadius: 8,
    },
    droneMarkerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    farmMarkerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    calloutContainer: {
        width: 160,
        padding: 12,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        elevation: 4,
    },
    calloutTitle: {
        fontFamily: "NotoNastaliqUrdu-Bold",
        fontSize: 16,
        color: '#40513B',
        textAlign: 'right',
        marginBottom: 4,
    },
    calloutText: {
        fontFamily: "NotoNastaliqUrdu-Regular",
        fontSize: 14,
        color: '#609966',
        textAlign: 'right',
    },
    buttonsContainer: {
        position: 'absolute',
        right: 16,
        bottom: 30,
        flexDirection: 'column',
        gap: 12,
    },
    actionButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#40513B',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: width * 0.85,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
        elevation: 5,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
    },
    modalTitle: {
        fontFamily: "NotoNastaliqUrdu-Bold",
        fontSize: 22,
        color: '#40513B',
        textAlign: 'center',
        marginBottom: 16,
        marginTop: 8,
    },
    modalImage: {
        width: width * 0.7,
        height: width * 0.5,
        borderRadius: 8,
        marginVertical: 16,
    },
    modalDescription: {
        fontFamily: "NotoNastaliqUrdu-Regular",
        fontSize: 16,
        color: '#609966',
        textAlign: 'center',
        marginBottom: 16,
    },
    modalButton: {
        backgroundColor: "#609966",
        borderRadius: 8,
        marginTop: 8,
        width: '100%',
    },
});