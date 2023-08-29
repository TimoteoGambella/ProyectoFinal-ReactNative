import React, { useEffect, useState } from "react";
import {
    Button,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
} from "react-native";
import allProducts from "../Data/products.json";
import { useDispatch } from "react-redux";
import { addCartItem } from "../Features/Cart/cartSlice";

const ItemDetail = ({ 
    navigation,
    route
}) => {

    const { productId: idSelected } = route.params;

    const dispatch = useDispatch();

    const [product, setProduct] = useState(null);
    const [orientation, setOrientation] = useState("portrait");
    const { width, height } = useWindowDimensions();

    useEffect(() => {
        if (width > height) setOrientation("landscape");
        else setOrientation("portrait");
    }, [width, height]);

    useEffect(() => {
        const productSelected = allProducts.find(
            (product) => product.id === idSelected
        );
        setProduct(productSelected);
    }, [idSelected]);

    const onAddCart = () => {
        dispatch(addCartItem({
            ...product,
            quantity: 1
        }));
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {product && (
                <View
                    style={[
                        styles.mainContainer,
                        orientation === "landscape" && styles.mainContainerLandscape
                    ]}
                >
                    <Image
                        source={{ uri: product.images[0] }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{product.title}</Text>
                        <Text style={styles.description}>{product.description}</Text>
                        <Text style={styles.price}>${product.price}</Text>
                        <Button title="Add to Cart" onPress={onAddCart} />
                    </View>
                </View>
            )}
        </ScrollView>
    );
};

export default ItemDetail;

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
    },
    mainContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        maxWidth: "90%"
    },
    mainContainerLandscape: {
        flexDirection: "row",
        alignItems: "flex-start",
        maxWidth: "90%"
    },
    image: {
        width: 250,
        height: 250,
        borderRadius: 10,
    },
    textContainer: {
        padding: 20,
        flexDirection: "column",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 15,
    },
    price: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#d32f2f",
    },
});