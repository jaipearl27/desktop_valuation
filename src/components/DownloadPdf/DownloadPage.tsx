// src/components/ReportPDF/MyDocument.js
"use client"
import React from 'react';
import { Page, View, Document, StyleSheet } from '@react-pdf/renderer';
import Mainpage from '@/components/ReportPDF/MainPage/mainPage';
import Tablepage from '@/components/ReportPDF/TablePage/tablePage';
import LastPage from '@/components/ReportPDF/LastPage/lastPage';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        // padding: 15,
    },
    section: {
        // margin: 10,
        // padding: 10,
        flexGrow: 1,
    },
    sectionTable: {
        position: "relative",
        // margin: 10,
        // padding: 10,
        flexGrow: 1,
    },
    // pageBreak: {
    //     marginBottom: 20,
    // },
});

const DownloadPage = ({ reportData, mapUrls }) => { 

    return (
        <Document>
             {/* First Page */}
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Mainpage reportData={reportData}/>
                </View>
            </Page>
            {/* Second Page */}
            <Page size="A4" style={styles.page}>
                <View style={styles.sectionTable}>
                    <Tablepage data={reportData} />
                </View>
            </Page>
             {/* Third Page */}
            <Page size="A4">
                <View style={styles.section}>
                    <LastPage reportData={reportData} mapUrls={mapUrls} />
                </View>
            </Page>
        </Document>
    )
};

export default DownloadPage;
