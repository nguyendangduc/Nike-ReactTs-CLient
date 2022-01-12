import styles from './Order.module.css';

interface OrderProps {
    order: IOrder,
}

export const Order = (props: OrderProps) =>{
    const {order} =  props;
    return (
        <div className="card flex-row my-3 align-items-center">
            <img
                src={order.urlImg}
                className={styles.img}
                alt="thumbnail"
            />
            <div className="card-body mx-3">
                <h5 className="card-title">{order.productName}</h5>
                <p className="card-text">Size: {order.size}</p>
                <p className="card-text">Quantity: {order.quantity}</p>
            </div>
            <div className="px-5">
                <p className="m-0">Price: ${order.price}</p>
            </div>
        </div>
    )
}