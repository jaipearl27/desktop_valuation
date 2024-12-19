import React from 'react'
import { View, Text, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    serialNumber:{
        position: "absolute",
        top: 50,
        width: "100%",
        fontSize: 10,
        left: 30,
        fontWeight: 'bold',
    },
    section: {
        position: "absolute",
        top: 80,
        width: "100%",
        padding:20
    },
    image: {
        width: '100%',
        height: '100%'
    },
    imageContainer: {
        position: "relative",
        width: '100%',
        height: '100%'
    },
    mapImage: {
        width: "250px",
        height: "250px"
    },
    mapImageContainer:{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto",
    },
    mapTitle: {
        paddingTop: 10,
        paddingBottom: 20,
        fontSize: 12,
        fontWeight: 'bold',
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    imageFooter: {
        position: 'absolute',
        right: 0,
        left: 0,
        width: "100%",
        padding: 10,
        bottom: 0
    },
    pageNo: {
        fontSize: 10,
        marginLeft: "50px",
        position: "absolute",
        bottom:3,
    },
});

const LastPage = ({ reportData, mapUrls }) => {

    return (
        <>
            <View style={styles.imageContainer}>
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image style={styles.image} src="/images/A4.png" />
                <Text style={styles.serialNumber}>{reportData.case_ref_no}</Text>
                <View style={styles.section}>
                    <Text style={styles.mapTitle}>Route Map</Text>
                    <View style={styles.mapImageContainer}>
                        {mapUrls?.normal && 
                            // eslint-disable-next-line jsx-a11y/alt-text
                            <Image style={styles.mapImage} src={mapUrls.normal} />
                        }
                    </View>
                    <Text style={styles.mapTitle}>Satellite Map</Text>
                    <View style={styles.mapImageContainer}>
                        {mapUrls?.satellite && 
                            // eslint-disable-next-line jsx-a11y/alt-text
                            <Image style={styles.mapImage} src={mapUrls.satellite} />
                        }
                    </View>
                </View>
                <Text style={styles.pageNo} render={({ pageNumber, totalPages }) => `Page No: ${pageNumber} of ${totalPages}`} fixed />
            </View>
        </>
    )
}

export default LastPage
