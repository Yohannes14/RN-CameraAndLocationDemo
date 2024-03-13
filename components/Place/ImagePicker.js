import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from "expo-image-picker"
import { Colors } from '../../constants/Colors';

const ImagePicker = () => {
    const [pickerImage, setPickerImage] = useState();
    const [cameraPermissionInfo, requestPermission] = useCameraPermissions();

    const verifyPermission = async () => {
        if (cameraPermissionInfo.status === PermissionStatus.UNDETERMINED) {
            const permissionRes = await requestPermission();
            return permissionRes.granted;
        }
        if (cameraPermissionInfo.status === PermissionStatus.DENIED) {
            Alert.alert("Insufficient Permission!", "You need to grant camera permissions to use this app");
            return false;
        }
        return true;

    }

    const takeImageHandler = async () => {
        const hasPermission = await verifyPermission();
        if (!hasPermission) {
            return;
        }
        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        });
        setPickerImage(image.assets[0]?.uri);
    }


    let imagePreview = <Text> No Image taken yet.</Text>
    if (ImagePicker) {
        imagePreview = <Image style={styles.image} source={{ uri: pickerImage }} />;

    }


    return (
        <View>
            <View style={styles.imagePreview}>
                {imagePreview}
            </View>
            <Button title='Take Image' onPress={takeImageHandler} />
            <Text>ImagePicker</Text>
        </View>
    )
}

export default ImagePicker

const styles = StyleSheet.create({
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
    },
    image: {
        width: '100%',
        height: '100%'
    }
})