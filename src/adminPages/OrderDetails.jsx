import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instance from "../axiosInstance/Instance";
import { Spinner, Container, Row, Col, Table, Card, Badge, Button, ButtonGroup } from "react-bootstrap";

const OrderDetails = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchOrderDetails = async () => {
            try {
                const res = await instance.get(`/api/orders/${orderId}`);        
                setOrder(res.data);
            } catch (error) {
                // Optionally, handle error UI here
                console.error(error);
            }
            setLoading(false);
        };
        fetchOrderDetails();
    }, [orderId]);

    const getStatusVariant = (status) => {
        if (!status) return "secondary";
        switch (status.toLowerCase()) {
            case "pending":
                return "warning";
            case "completed":
                return "success";
            case "cancelled":
                return "danger";
            default:
                return "secondary";
        }
    };

    const updateStatus = async (newStatus) => {
        setUpdating(true);
        try {
            await instance.patch(`/api/orders/${orderId}`, { status: newStatus });
            setOrder((prev) => ({ ...prev, status: newStatus }));
        } catch (error) {
            console.error(error);
            // Optionally, show error to user
        }
        setUpdating(false);
    };

    return (
        <Container style={{ maxWidth: 800, marginTop: 40, marginBottom: 40 }}>
            <Card className="shadow-lg">
                <Card.Body>
                    <Card.Title as="h2" className="mb-4 text-primary">
                        Order Details
                    </Card.Title>
                    {loading ? (
                        <div className="text-center my-5">
                            <Spinner animation="border" size="md" className="me-2" /> Loading...
                        </div>
                    ) : (
                        <>
                            <Row className="mb-4">
                                <Col md={6}>
                                    <h4 className="mb-3">Customer Info</h4>
                                    <div>
                                        <div className="mb-2">
                                            <strong>Name:</strong> {order.name}
                                        </div>
                                        <div className="mb-2">
                                            <strong>Email:</strong> {order.email}
                                        </div>
                                        <div className="mb-2">
                                            <strong>Address:</strong> {order.country} | {order.province} | {order.townOrCity} | {order.streetAddress}
                                        </div>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <h4 className="mb-3">Order Summary</h4>
                                    <div className="mb-2">
                                        <strong>Total:</strong>{" "}
                                        {order.totalPrice !== undefined ? `$${order.totalPrice.toFixed(2)}` : "--"}
                                    </div>
                                    <div className="mb-2">
                                        <strong>Status:</strong>{" "}
                                        <Badge bg={getStatusVariant(order.status)} className="text-capitalize">
                                            {order.status || "--"}
                                        </Badge>
                                    </div>
                                    <div className="mb-2">
                                        <ButtonGroup>
                                            <Button
                                                variant="success"
                                                size="sm"
                                                disabled={updating || order.status === "completed"}
                                                onClick={() => updateStatus("completed")}
                                            >
                                                Mark as Complete
                                            </Button>
                                            <Button
                                                variant="warning"
                                                size="sm"
                                                disabled={updating || order.status === "pending"}
                                                onClick={() => updateStatus("pending")}
                                            >
                                                Mark as Pending
                                            </Button>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                disabled={updating || order.status === "cancelled"}
                                                onClick={() => updateStatus("cancelled")}
                                            >
                                                Cancel Order
                                            </Button>
                                        </ButtonGroup>
                                    </div>
                                </Col>
                            </Row>
                            <h4 className="mb-3">Order Items</h4>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Qty</th>
                                        <th>Price</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.items?.length > 0 ? (
                                        order.items.map((item) => (
                                            <tr key={item.productId}>
                                                <td>{item.title}</td>
                                                <td>{item.quantity}</td>
                                                <td>${item.price.toFixed(2)}</td>
                                                <td>${(item.price * item.quantity).toFixed(2)}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="text-center text-muted">
                                                No items found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default OrderDetails;
