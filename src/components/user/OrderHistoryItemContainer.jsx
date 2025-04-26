import OrderHistoryItem from './OrderHistoryItem';

const OrderHistoryItemContainer = ({ orderitems = [] }) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card" style={{ height: "300px", overflow: "hidden" }}>
          <div className="card-header" style={{ backgroundColor: '#6050DC', color: 'white' }}>
            <h5>Order History</h5>
          </div>
          <div className="card-body" style={{ overflowY: "auto", height: "230px" }}>
            {orderitems.length > 0 ? (
              orderitems.map(item => <OrderHistoryItem key={item.id} item={item} />)
            ) : (
              <p>No order history found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryItemContainer;
