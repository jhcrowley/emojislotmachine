import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';

export default function App() {
    const [slots, setSlots] = useState(["🍒", "🍒", "🍒"]);
    const [result, setResult] = useState("");

    const EMOJIS = ["🍒", "🍋", "🍉", "⭐", "🍇"];

    const rotation = useSharedValue(0);

    const getRandomEmoji = () => {
        return EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    };

    const spinSlots = () => {
        const finalSlots = [getRandomEmoji(), getRandomEmoji(), getRandomEmoji()];
        setResult("");

        const cycles = 20; // Total number of emoji cycles
        let count = 0;

        // Cycle through emojis
        const interval = setInterval(() => {
            count++;
            setSlots([getRandomEmoji(), getRandomEmoji(), getRandomEmoji()]);

            // Slow down at the end
            if (count > cycles - 4) {
                clearInterval(interval);
                setTimeout(() => {
                    setSlots(finalSlots);
                    if (finalSlots[0] === finalSlots[1] && finalSlots[1] === finalSlots[2]) {
                        setResult("🎉 You Win!");
                    } else {
                        setResult("Try Again!");
                    }
                }, 500); // Wait slightly before stopping
            }
        }, 100); // Initial speed of cycling
    };

    return (
        <View style={styles.container}>
            <View style={styles.slotContainer}>
                <Text style={styles.slot}>{slots[0]}</Text>
                <Text style={styles.slot}>{slots[1]}</Text>
                <Text style={styles.slot}>{slots[2]}</Text>
            </View>
            <Button title="Spin" onPress={spinSlots} />
            <Text style={styles.result}>{result}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    slotContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },
    slot: {
        fontSize: 60,
        marginHorizontal: 10,
    },
    result: {
        fontSize: 20,
        marginTop: 20,
    },
});