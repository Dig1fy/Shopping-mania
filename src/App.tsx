import { useState } from 'react';
import { useQuery } from 'react-query';

// Components
import Cart from './components/Cart/Cart';
import Item from './components/item/Item';
import Drawer from '@material-ui/core/Drawer';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';
// Styles
import { Wrapper, StyledButton } from './App.styles';
// Types
export type CartItemType = {
  id: number,
  category: string,
  description: string,
  image: string,
  price: number,
  title: string,
  amount: number,
}

const getProducts = async (): Promise<CartItemType[]> => {
  return await (await fetch('https://fakestoreapi.com/products')).json();
  // return await (await fetch("https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/regions/list", {
  //   "method": "GET",
  //   "headers": {
  //     "x-rapidapi-host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
  //     "x-rapidapi-key": "f7cd46ce59mshbb977d4e3aceab5p1a08d4jsncedc55d0c5d7"
  //   }
  // })).json()
}

const App = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts);
  console.log(data);

  const getTotalItems = (cartItems: CartItemType[]) => (
    cartItems.reduce((acc: number, item) => acc + item.amount, 0)
  );

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      //Is the item already in cart
      const isItemInCart = prev.find(item => item.id === clickedItem.id)

      if (isItemInCart) {
        return prev.map(item =>
          item.id === clickedItem.id ? { ...item, amount: item.amount + 1 } : item)
      }
      //if it's not in the cart yet
      return [...prev, { ...clickedItem, amount: 1 }]
    })
  }

  const hasndleRemoveFromCart = (id: number) => {
    setCartItems(prev => (
      prev.reduce((ack, item) => {
        if (item.id === id) { //this is the item we've clicked to decrease
          if (item.amount === 1) { // if the amount is 1 and we decrease the amount, we should remove the item
            return ack;
          }

          return [...ack, { ...item, amount: item.amount - 1 }]
        } else {
          return [...ack, item]
        }
      }, [] as CartItemType[])
    ))
  }

  if (isLoading) {
    return <CircularProgress />;
  }
  if (error) {
    return <div>Something went wrong...</div>
  }

  return (
    <Wrapper>
      <Drawer anchor='right' open={isCartOpen} onClose={() => setIsCartOpen(false)}>
        Cart items go here!!!
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={hasndleRemoveFromCart} />
      </Drawer>
      <StyledButton onClick={() => setIsCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'></Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
