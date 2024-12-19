
import React from 'react'
import { View, Text, StyleSheet, Image } from '@react-pdf/renderer'

const styles = StyleSheet.create({
    section: {
        position: "absolute",
        top: 80,
        padding:20
    },
    serialNumber:{
        position: "absolute",
        top: 50,
        width: "100%",
        fontSize: 10,
        left: 30,
        fontWeight: 'bold',
    },
    tableContainer: {
        width: '100%',
    },
    tableRow: {
        flexDirection: 'row',
        width: "100%",
    },
    tableCol: {
        width: '45%',
        borderStyle: 'solid',
        borderWidth: 1,
        padding: 3,
    },
    tableColNo: {
        width: "10%",
        borderStyle: 'solid',
        borderWidth: 1,
        padding: 3,
    },
    tableCell: {
        fontSize: 10,
        fontWeight: "normal",
    },
    tableHeader: {
        backgroundColor: '#E5E7EB',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 11
    },
    image: {
        width: '100%',
        height: '100%',
    },
    CAImage:{
        width: '17px',
        height: "12px",
    },
    BUAImage:{
        width: '20px',
        height: "12px",
    },
    imageContainer: {
        position:"relative",
        width: '100%',
        height: '100%'
    },
    imageFooter: {
        position: 'absolute',
        right: 0,
        left: 0,
        width: "100%",
        padding: 10,
        bottom: 0
    },
    remarksContainer: {
        marginTop: 10,
        padding: 20,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#000',
    },
    remark: {
        fontSize: 10,
        marginBottom: 3,
    },
    remarksTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    pageNo:{
        position: "absolute",
        bottom: 3,
        fontSize: 10,
        marginLeft: "50px"
    },
});

const Tablepage = ({data}: any) => {
    const dataFields = [
        { isCustom: false, label: "Owner Name", value: data?.owner_name },
        { isCustom: false, label: "Owner Address", value: data?.owner_address },
        { isCustom: false, label: 'Report Date', value: data?.report_date },
        { isCustom: false, label: 'Case Ref No.', value: data?.case_ref_no },
        { isCustom: false, label: 'Property Address', value: data?.property_address },
        { isCustom: false, label: 'Nearest Landmark', value: data?.nearest_landmark },
        { isCustom: false, label: 'Property Land Area', value: data?.property_land_area + ' ' + 'sqft' },
        { isCustom: false, label: 'Age Of Property', value: data?.age_of_property },
        { isCustom: false, label: 'Type Of Property', value: data?.type_of_property },
        { isCustom: false, label: 'Carpet Area', value: data?.carpet_area ? data?.carpet_area + ' ' + 'sqft' : '-' },
        { isCustom: false, label: 'Super BuiltUp Area', value: data?.super_built_up_area ? data?.super_built_up_area + ' ' + 'sqft' : '-' },
        { isCustom: true, 
            label: <Text style={styles.tableCell}>Unit Rate considered for {data?.type_of_property !== "Independent" ? 
            // eslint-disable-next-line jsx-a11y/alt-text
            <Image style={styles.CAImage} src="/images/ca.png"></Image> : "CA"} /  
            {data?.type_of_property === "Independent" ? 
            // eslint-disable-next-line jsx-a11y/alt-text
            <Image style={styles.BUAImage} src="/images/bua.png"/>: " BUA "} </Text>, 
        value:  `Rs.${data?.unit_rate_considered_for_ca_bua_sba}/-` },
        { isCustom: false, label: 'Land Area', value: data?.land_area ? data?.land_area + ' ' + 'sqft' : '-' },
        { isCustom: false, label: 'Land Value', value: data?.land_value ? `Rs.${data?.land_value}/-`: "-"},
        { isCustom: false, label: 'Unit Rate considered for Land', value: `Rs.${data?.unit_rate_considered_for_land}/-`},
        { isCustom: false, label: 'Building Value', value: data?.building_value ? `Rs.${data?.building_value}/-`: "-"},
        { isCustom: false, label: 'Final Valuation', value: data?.final_valuation ? `Rs.${data?.final_valuation}/-`: "-" },
        { isCustom: false, label: 'Final Valuation in Word', value: data?.final_valuation_in_word },
        { isCustom: false, label: "Distress Value", value: data?.DV ? `Rs.${data?.DV}/-`: "-"  },
        { isCustom: false, label: "Realizable Value", value: data?.RV ? `Rs.${data?.RV}/-`: "-" },
    ];
    

    const remarks = [
        "We have not verified any legal/technical documents and approved plan for this property.",
        "We haven’t done engineering survey at site.",
        "The validity of Desktop Valuation report is 45 days from the report generated date.",
        "Accuracy of Desktop Valuation Report is lesser compared to the Valuation Report by physical inspection & legal document verification.",
        "The Predicted Valuation of the property is based on the market survey and equation algorithm of our system. The Actual Fair market Valuation may vary compared to the Desktop valuation.",
    ];

    return (
        <>
            <View style={styles.imageContainer}>
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image style={styles.image} src="/images/A4.png" />
                <Text style={styles.serialNumber}>{data.case_ref_no}</Text>
                <View style={styles.section}>
                    <View style={styles.tableContainer}>
                        {/* Table header */}
                        <View style={styles.tableRow}>
                            <View style={styles.tableColNo}>
                                <Text style={styles.tableHeader}>Sr No</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableHeader}>Particulars</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableHeader}>Details</Text>
                            </View>
                        </View>
                        {/* Table body */}
                        {dataFields?.map((item, index) => (
                            <View style={styles.tableRow} key={index}>
                                <View style={styles.tableColNo}>
                                    <Text style={styles.tableCell}>{index + 1}</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    {item.isCustom ? item.label : <Text style={styles.tableCell}>{item.label}</Text>}
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{item.value}</Text>
                                </View>
                            
                            </View>
                        ))}
                    </View>
                    <View style={styles.remarksContainer}>
                    <Text style={styles.remarksTitle}>Remarks:</Text>
                        {remarks?.map((remark, index) => (
                            <Text style={styles.remark} key={index}>{index + 1}. {remark}</Text>
                        ))}
                    </View>
                </View>
                <Text style={styles.pageNo} render={({ pageNumber, totalPages }) => `Page No: ${pageNumber} of ${totalPages}`} fixed />
            </View>
        </>
    )
}

export default Tablepage
