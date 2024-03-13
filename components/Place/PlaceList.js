import { FlatList, View, Text, StyleSheet } from 'react-native'
import PlaceItem from './PlaceItem';
import { Colors } from '../../constants/Colors';

const PlaceList = ({ places }) => {
    if (!places) {
        return (
            <View style={styles.fallbackCOntainer}>
                <Text style={styles.fallbackText}>No places added yet - start adding some</Text>
            </View>
        )
    }
    return (
        <FlatList data={places}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <PlaceItem place={item} />}
        />
    )
}

export default PlaceList;

const styles = StyleSheet.create({
    fallbackCOntainer: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center'
    },
    fallbackText: {
        fontSize: 16,
        color:Colors.primary200

    }
})