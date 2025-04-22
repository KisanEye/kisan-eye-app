import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  align-items: center;
  justify-content: center;
`;

export const HeadingText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.displayLarge.fontFamily};
  font-size: ${({ theme }) => theme.fonts.displayLarge.fontSize}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const BodyText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bodyLarge.fontFamily};
  font-size: ${({ theme }) => theme.fonts.bodyLarge.fontSize}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Button = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 15px;
  border-radius: 8px;
  margin: 10px;
`;

export const ButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.labelLarge.fontFamily};
  font-size: ${({ theme }) => theme.fonts.labelLarge.fontSize}px;
  color: white;
  text-align: center;
`;