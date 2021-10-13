import CartItem from '../CartItem/CartItem'

//Styles
import { Wrapper } from './Cart.styles';
//Types
import { CartItemType } from '../../App';
import { RemoveFromQueue } from '@material-ui/icons';

type Props = {
    cartItems: CartItemType[];
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (itemId: number) => void;
}

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
    const calculateTotal = (items: CartItemType[]) => {
        return items.reduce((ack: number, item) =>
            ack + item.amount * item.price, 0
        )
    }
    return (
        <Wrapper>
            <h2>Your SHOPPING CART</h2>
            {cartItems.length === 0 ? <p>No items in cart</p> : null}
            {cartItems.map(item => (
                <CartItem
                    key={item.id}
                    item={item}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                />)
            )}
            <h2 className='total'>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
        </Wrapper>
    )
}

export default Cart;