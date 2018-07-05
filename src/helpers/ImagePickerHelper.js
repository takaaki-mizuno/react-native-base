import ImagePicker from 'react-native-image-picker';

class ImagePickerHelper {
    static getImage(callback) {
        const options = {
            title: 'Select Image',
        };

        ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log(
                    'User tapped custom button: ',
                    response.customButton
                );
            } else {
                let data = {
                    uri: response.uri,
                    width: response.width,
                    height: response.height,
                    latitude: response.latitude,
                    longitude: response.longitude,
                    timestamp: response.timestamp,
                    originalRotation: response.originalRotation,
                };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                if (callback) {
                    callback({
                        response: data,
                    });
                }
            }
        });
    }
}

export default ImagePickerHelper;
