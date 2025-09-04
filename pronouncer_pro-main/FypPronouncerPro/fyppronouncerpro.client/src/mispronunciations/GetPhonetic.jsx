import { Typography, TableContainer, Table, TableCell, TableRow, TableBody } from "@mui/material";
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';

const GetPhonetic = ({ word }) => {
    const [apiResponse, setApiResponse] = useState(null);
   /* const [syllableResponse, setsyllableResponse] = useState(null);*/

    useEffect(() => {
        const fetchPhonetic = async () => {
            try {
                const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
                console.log(response.data);
                setApiResponse(response.data);
            } catch (error) {
                console.error('Error fetching data from the API:', error.message);
            }
        };
        /*const fetchSyllable = async () => {
            try {
                const Response = await axios.get(`https://api.datamuse.com/words?sl=${word}&s`);
                setsyllableResponse(Response.data[0]?.numSyllable);
            } catch (error) {
                console.error('Error fetching data from the API:', error.message);
            }
        };
        fetchSyllable();*/
        fetchPhonetic();
    }, [word]);

    useEffect(() => {
    }, [apiResponse]);

    const phonetic = apiResponse?.[0]?.phonetic || '';
    const synonyms = apiResponse?.[0]?.meanings[0]?.synonyms;
    const synonymsString = synonyms ? synonyms.join(' - ') : '';
    const definition = apiResponse?.[0]?.meanings[0]?.definitions[0]?.definition;
    const example = apiResponse?.[0]?.meanings[0]?.definitions[0]?.example; 

    return (
        <>
            <TableContainer>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell><Typography sx={{ color: "#f02e4e", textAlign: 'center', fontSize: {md:"25px", xs:"16px"} }}>{word.toUpperCase()}</Typography></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography sx={{ color: "#f02e4e", fontSize: { md: "16px", xs: "14px" } }}>Phonetic : <span style={{color:"#565656"} }>{phonetic}</span> </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography sx={{ color: "#f02e4e", fontSize: { md: "16px", xs: "14px" } }}>Synonym  :  <span style={{ color: "#565656" }}>{synonymsString}</span></Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography sx={{ color: "#f02e4e", fontSize: { md: "16px", xs: "14px" } }}>Definition  :  <span style={{ color: "#565656" }}>{definition}</span></Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography sx={{ color: "#f02e4e", fontSize: { md: "16px", xs: "14px" } }}>Example Sentence : <span style={{ color: "#565656" }}>{example}</span></Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            

        </>
    );
};

GetPhonetic.propTypes = {
    word: PropTypes.string.isRequired,
};

export default GetPhonetic;
