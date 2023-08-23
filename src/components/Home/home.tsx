import React, { FC, useEffect, useMemo, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import H1 from "../common/H1";
import { POKEMON_URL } from "../../constants";

export default function Home() {
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<any>([]);

    const placeholders = useMemo(() => [1, 2, 3, 4, 5], []);
    
    useEffect(() => {
        setLoading(true);
        fetch(POKEMON_URL)
            .then((res: any) => res.json())
            .then((data) => {
                setTimeout(() => {
                    setLoading(false);
                    setResults(data.results);
                }, 2000);
            })
    }, []);

    const showDetail = () => {
        console.log("show pokemon detail");
    };
    
    const capitalizedString = useMemo(() => (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }, []);

   return loading ? 
        <View style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
        }}>
            <H1 t="React Native Exercise" />
            {placeholders.map(() => {
                return <Text style={{ fontSize: 14, textAlign: "center", marginTop: 20 }}>Loading...</Text>
            })}
        </View> :
        <View style={{
                flex: 1,
                backgroundColor: "#fff",
                alignItems: "center",
                justifyContent: "center",
            }}>
            {<>
            <H1 t="Pokemon List" />
            {results.length > 0 && results.map((i) => {
                return <TouchableOpacity onPress={() => showDetail()}>
                            <Text style={{ fontSize: 14, textAlign: "center" }}>Pokemon: {capitalizedString(i.name)}</Text>
                        </TouchableOpacity>
                })}
            </>}
        </View>
};