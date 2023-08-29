import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ProductItem from '../Components/ProductItem';
import Search from '../Components/Search';
import { colors } from '../Global/Colors';
import { useSelector } from 'react-redux';
import { useGetProductsByCategoryQuery } from '../Services/shopServices';

const ItemListCategory = ({
  navigation,
  route
}) => {
  const { category } = route.params;
  const categorySelected = useSelector(state => state.shopReducer.value.categorySelected);
  const { data: productsSelected, isError, isLoading } = useGetProductsByCategoryQuery(categorySelected);

  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [keywordError, setKeywordError] = useState('');

  useEffect(() => {
    if (productsSelected) {
      const productsFiltered = productsSelected.filter(product => product.title.toLocaleLowerCase().includes(keyword.toLowerCase()));
      setProducts(productsFiltered);
    }
  }, [productsSelected, keyword]);

  const onSearch = input => {
    const expression = /^[a-zA-Z0-9\ ]*$/;
    const evaluation = expression.test(input);

    if (evaluation) {
      setKeyword(input);
      setKeywordError('');
    } else {
      setKeywordError('Solo letras y números');
    }
  };

  return (
    <View style={styles.container}>
      <Search
        onSearch={onSearch}
        error={keywordError}
        goBack={() => navigation.goBack()}
      />
      <FlatList
        data={products}
        keyExtractor={product => product.id}
        renderItem={({ item }) => (
          <ProductItem
            item={item}
            navigation={navigation}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.color4,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default ItemListCategory;