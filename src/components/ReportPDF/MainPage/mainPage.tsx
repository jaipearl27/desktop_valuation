import React from 'react'
import { Image, StyleSheet, Text, View } from '@react-pdf/renderer';


const styles = StyleSheet.create({
    serialNumber:{
        position: "absolute",
        top: 50,
        width: "100%",
        fontSize: 10,
        left: 30,
        fontWeight: 'bold',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageContainer: {
        position:"relative",
        width: '100%',
    },
    pageNo: {
        fontSize: 10,
        position: "absolute",
        bottom:3,
        marginLeft: "50px"
    },
});
const Mainpage = ({reportData}) => {

    return (
        <View style={styles.imageContainer}>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image style={styles.image} src="/images/firstPage.png" />
            <Text style={styles.serialNumber}>{reportData.case_ref_no}</Text>
            <Text style={styles.pageNo} render={({ pageNumber, totalPages }) => `Page No: ${pageNumber} of ${totalPages}`} fixed />
        </View>
    )
}

export default Mainpage