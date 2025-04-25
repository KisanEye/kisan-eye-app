import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Image, Modal, TouchableOpacity, Dimensions, Alert } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE, Polygon, Overlay } from 'react-native-maps';
import * as Location from 'expo-location';
import { Appbar, Button, Card, Avatar, ActivityIndicator } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as FileSystem from 'expo-file-system';

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
        id: 3,
        title: "شمالی کھیت", // Northern Field
        coordinates: { latitude: 24.9198032, longitude: 67.3012061 },
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
    {
        id: 4,
        title: "جنوبی کھیت", // Southern Field
        coordinates: { latitude: 24.9199121, longitude: 67.3010894 },
        image: require('../assets/images/farm.jpg'),
        description: "کیڑے متاثر حصہ", // Pest Affected Area
    },
];

// Hardcoded drone location with heading (can be updated with real data later)
const DRONE_INITIAL = {
    latitude: 25.2058074,
    longitude: 68.2530513,
    heading: 45, // degrees - 0 is north, 90 is east
    altitude: 25, // meters
    speed: 5, // m/s
    battery: 75, // percentage
};

// Farm boundary from KMZ file (extracted coordinates)
// In a real implementation, you would parse these from the KMZ file
const FARM_BOUNDARY = [
    { latitude: 25.2052074, longitude: 68.2523513 },
    { latitude: 25.2052074, longitude: 68.2538513 },
    { latitude: 25.2064074, longitude: 68.2538513 },
    { latitude: 25.2064074, longitude: 68.2523513 },
    { latitude: 25.2052074, longitude: 68.2523513 }, // Close the polygon
];

export default function MapScreen() {
    const router = useRouter();
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<any>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const mapRef = useRef<MapView>(null);
    const [drone, setDrone] = useState(DRONE_INITIAL);
    const [showSatellite, setShowSatellite] = useState(true);
    const [showBoundary, setShowBoundary] = useState(true);
    const [loadingBoundary, setLoadingBoundary] = useState(true);

    // Simulate loading the KMZ file
    useEffect(() => {
        // In a real implementation, you would parse the KMZ file here
        // For now, we'll just simulate loading with a timeout
        const timer = setTimeout(() => {
            setLoadingBoundary(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    // Simulate drone movement
    useEffect(() => {
        const droneInterval = setInterval(() => {
            setDrone(prevDrone => {
                // Calculate small random movement
                const latChange = (Math.random() - 0.5) * 0.0001;
                const lngChange = (Math.random() - 0.5) * 0.0001;

                // Update heading based on movement direction
                const newHeading = Math.atan2(lngChange, latChange) * (180 / Math.PI);

                return {
                    ...prevDrone,
                    latitude: prevDrone.latitude + latChange,
                    longitude: prevDrone.longitude + lngChange,
                    heading: newHeading > 0 ? newHeading : newHeading + 360,
                    battery: prevDrone.battery > 0 ? prevDrone.battery - 0.01 : 0,
                };
            });
        }, 2000);

        return () => clearInterval(droneInterval);
    }, []);

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
                latitude: drone.latitude,
                longitude: drone.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
            });
        }
    };

    const toggleMapType = () => {
        setShowSatellite(!showSatellite);
    };

    const toggleBoundary = () => {
        setShowBoundary(!showBoundary);
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
                            mapType={showSatellite ? "satellite" : "standard"}
                            initialRegion={{
                                latitude: 25.2058074,
                                longitude: 68.2530513,
                                latitudeDelta: 0.005,
                                longitudeDelta: 0.005,
                            }}
                            showsUserLocation={true}
                            showsMyLocationButton={false}
                            followsUserLocation={false}
                        >
                            {/* Farm Boundary from KMZ file */}
                            {!loadingBoundary && showBoundary && (
                                <Polygon
                                    coordinates={FARM_BOUNDARY}
                                    fillColor="rgba(96, 153, 102, 0.3)"
                                    strokeColor="#609966"
                                    strokeWidth={2}
                                />
                            )}


                            {/* Drone Marker with Heading - Improved triangular design */}
                            <Marker
                                coordinate={{
                                    latitude: drone.latitude,
                                    longitude: drone.longitude
                                }}
                                title="ڈرون لوکیشن"
                                description="آپ کا ڈرون یہاں موجود ہے"
                                anchor={{ x: 0.5, y: 0.5 }}
                            >
                                <View style={[styles.droneMarkerContainer, { transform: [{ rotate: `${drone.heading}deg` }] }]}>
                                    <View style={styles.droneTriangle} />
                                    <View style={styles.droneDot} />
                                </View>
                                <Callout tooltip>
                                    <View style={styles.calloutContainer}>
                                        <Text style={styles.calloutTitle}>آپ کا ڈرون</Text>
                                        <Text style={styles.calloutText}>بیٹری: {drone.battery.toFixed(0)}%</Text>
                                        <Text style={styles.calloutText}>اونچائی: {drone.altitude}m</Text>
                                        <Text style={styles.calloutText}>رفتار: {drone.speed} m/s</Text>
                                        <Text style={styles.calloutText}>سمت: {drone.heading.toFixed(0)}°</Text>
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

                        {/* Loading indicator for KMZ */}
                        {loadingBoundary && (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size="small" color="#40513B" />
                                <Text style={styles.loadingText}>کھیت کی حدود لوڈ ہو رہی ہیں</Text>
                            </View>
                        )}

                        {/* Drone Status */}
                        <View style={styles.droneStatusContainer}>
                            <View style={styles.statusRow}>
                                <Text style={styles.droneStatusText}>
                                    بیٹری: {drone.battery.toFixed(0)}%
                                </Text>
                                <MaterialCommunityIcons
                                    name={drone.battery > 20 ? "battery" : "battery-alert"}
                                    size={20}
                                    color={drone.battery > 20 ? "#609966" : "#FF5722"}
                                />
                            </View>
                            <View style={styles.statusRow}>
                                <Text style={styles.droneStatusText}>
                                    اونچائی: {drone.altitude}m
                                </Text>
                                <MaterialCommunityIcons name="altimeter" size={20} color="#609966" />
                            </View>
                        </View>

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
                                onPress={toggleMapType}
                            >
                                <MaterialCommunityIcons
                                    name={showSatellite ? "satellite-variant" : "map"}
                                    size={28}
                                    color="#FFFFFF"
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={toggleBoundary}
                            >
                                <MaterialCommunityIcons
                                    name={showBoundary ? "eye-off" : "eye"}
                                    size={28}
                                    color="#FFFFFF"
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={() => {
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
                                                    // Send drone to selected location
                                                    setDrone(prevDrone => ({
                                                        ...prevDrone,
                                                        latitude: selectedLocation.coordinates.latitude,
                                                        longitude: selectedLocation.coordinates.longitude,
                                                    }));
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
        width: 40,
        height: 40,
    },
    droneTriangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 20,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#1976D2', // Blue color for drone
        transform: [{ rotate: '0deg' }],
    },
    droneDot: {
        position: 'absolute',
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#0D47A1',
        top: 12,
        zIndex: 1,
    },
    droneHeadingIndicator: {
        position: 'absolute',
        top: -8,
        width: 0,
        height: 0,
        borderLeftWidth: 6,
        borderRightWidth: 6,
        borderBottomWidth: 12,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#FF5722',
    },
    farmMarkerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    calloutContainer: {
        width: 170,
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
    loadingContainer: {
        position: 'absolute',
        top: 20,
        alignSelf: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 8,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 4,
    },
    loadingText: {
        fontFamily: "NotoNastaliqUrdu-Medium",
        fontSize: 16,
        color: '#40513B',
        marginLeft: 10,
        textAlign: 'right',
    },
    droneStatusContainer: {
        position: 'absolute',
        top: 20,
        left: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 8,
        padding: 8,
        elevation: 3,
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginVertical: 4,
    },
    droneStatusText: {
        fontFamily: "NotoNastaliqUrdu-Medium",
        fontSize: 14,
        color: '#40513B',
        marginRight: 6,
        textAlign: 'right',
    }
});