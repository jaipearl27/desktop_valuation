import React from 'react';
import dynamic from "next/dynamic";

import Image from 'next/image';
import DownloadPage from './DownloadPage';


const PDFDownloadLink = dynamic(
    () => import('@react-pdf/renderer').then(mod => mod.PDFDownloadLink),
    { ssr: false, loading: () => <p>Loading...</p> }
);

interface DownloadPDFProps {
    reportData: any;
    mapUrls: any;
}

const DownloadPDF: React.FC<DownloadPDFProps> = ({ reportData, mapUrls }) => {
    return (
        <div>
            <PDFDownloadLink
                document={<DownloadPage reportData={reportData} mapUrls={mapUrls} />}
                fileName="report.pdf"
                className="flex rounded bg-green-950 px-4 py-2 font-bold text-white w-max"
            >
                {({ loading }: { loading: boolean }): React.ReactElement => {
                    if (loading) {
                        return <span>Loading document...</span>;
                    } else {
                        return (
                            <>
                                <Image
                                    className="mr-2"
                                    src="/images/pdf-down.svg"
                                    height={20}
                                    width={20}
                                    alt="pdf"
                                />
                                Download PDF
                            </>
                        );
                    }
                }}
            </PDFDownloadLink>
        </div>
    );

};

export default DownloadPDF;
