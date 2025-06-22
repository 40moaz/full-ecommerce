import React, { useEffect, useState } from "react";
import CartProduct from "../components/CartProduct";
import { Form, FormControl, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import instance from "../axiosInstance/Instance";

function Checkout({ cartItems, user }) {
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [townOrCity, setTownOrCity] = useState("");
  const [province, setProvince] = useState("");
  const [zipCode, setZIPCode] = useState("");
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Validation messages
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Load cart data from localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const validate = () => {
    const newErrors = {};

    if (!country.trim()) newErrors.country = "Country is required.";
    if (!streetAddress.trim())
      newErrors.streetAddress = "Street address is required.";
    if (!townOrCity.trim()) newErrors.townOrCity = "Town or city is required.";
    if (!province.trim()) newErrors.province = "Province is required.";
    if (!zipCode.trim()) newErrors.zipCode = "ZIP code is required.";
    if (!/^\d{5,6}$/.test(zipCode.trim()))
      newErrors.zipCode = "ZIP code is invalid.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const provinces = {
    Egypt: [
      "Cairo",
      "Giza",
      "Alexandria",
      "Dakahlia",
      "Sharqia",
      "Gharbia",
      "Monufiya",
      "Qalyubiya",
      "Beni Suef",
      "Fayoum",
      "Matruh",
      "Aswan",
      "Luxor",
      "Red Sea",
      "Port Said",
      "Suez",
      "North Sinai",
      "South Sinai",
      "Ismailia",
    ],
    "Saudi Arabia": [
      "Riyadh Province",
      "Makkah Province",
      "Madinah Province",
      "Eastern Province",
      "Al Qasim Province",
      "Hail Province",
      "Tabuk Province",
      "Al Jawf Province",
      "Najran Province",
      "Jizan Province",
      "Al Baha Province",
      "Asir Province",
      "Northern Borders Province",
    ],
    UAE: [
      "Abu Dhabi",
      "Dubai",
      "Sharjah",
      "Ajman",
      "Umm Al Quwain",
      "Ras Al Khaimah",
      "Fujairah",
    ],
    Jordan: [
      "Amman",
      "Zarqa",
      "Irbid",
      "Aqaba",
      "Jerash",
      "Ma'an",
      "Madaba",
      "Al Karak",
      "Tafilah",
      "Balqa",
      "Mafraq",
    ],
    Tunisia: [
      "Tunis",
      "Sfax",
      "Sousse",
      "Gabes",
      "Bizerte",
      "Nabeul",
      "Monastir",
      "Ariana",
      "Manouba",
      "Ben Arous",
    ],
    Lebanon: [
      "Beirut",
      "Mount Lebanon",
      "North Governorate",
      "South Governorate",
      "Bekaa",
      "Nabatieh",
      "Akkar",
      "Baalbek-Hermel",
    ],
    Oman: [
      "Muscat",
      "Dhofar",
      "Al Batinah North",
      "Al Batinah South",
      "Al Dakhiliyah",
      "Al Buraimi",
      "Al Wusta",
      "Al Sharqiyah North",
      "Al Sharqiyah South",
      "Musandam",
      "Ad Dhahirah",
    ],
    Bahrain: [
      "Capital Governorate",
      "Southern Governorate",
      "Northern Governorate",
      "Muharraq Governorate",
    ],
    Libya: [
      "Tripoli",
      "Benghazi",
      "Misratah",
      "Derna",
      "Zawiya",
      "Sabha",
      "Zliten",
      "Al Bayda",
    ],
    Algeria: [
      "Algiers",
      "Oran",
      "Constantine",
      "Annaba",
      "Blida",
      "Setif",
      "Tlemcen",
      "Batna",
    ],
    Iraq: [
      "Baghdad",
      "Basra",
      "Erbil",
      "Najaf",
      "Karbala",
      "Anbar",
      "Diyala",
      "Dohuk",
      "Sulaymaniyah",
      "Muthanna",
    ],
    Sudan: [
      "Khartoum",
      "Port Sudan",
      "Nyala",
      "Al Fashir",
      "Al Qadarif",
      "Al Ubayyid",
      "Kassala",
      "Atbara",
    ],
    Palestine: [
      "Jerusalem",
      "Gaza",
      "Ramallah",
      "Nablus",
      "Hebron",
      "Jenin",
      "Rafah",
      "Tulkarm",
    ],
    Yemen: [
      "Sana'a",
      "Aden",
      "Ta'izz",
      "Al Hudaydah",
      "Ibb",
      "Dhamar",
      "Marib",
      "Sa'dah",
    ],
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;
    setLoading(true);
    try {
      // Check if user is logged in
      if (!user || !user._id) {
        setErrors({ general: "You must be logged in to place an order." });
        setLoading(false);
        return;
      }

      // Check if cart is empty
      if (cartItems.length === 0) {
        setErrors({ general: "Your cart is empty." });
        setLoading(false);
        return;
      }

      // Save order to localStorage or send to server
      const response = await instance.post("/api/orders", {
        name: user.firstName + " " + user.lastName,
        userId: user._id,
        zipCode,
        country,
        province,
        townOrCity,
        streetAddress,
        phone: user.phone,
        email: user.email,
        paymentMethod: "cashOnDelivery",
        items: cartItems,
        status: "pending",
        totalPrice: cartItems.reduce(
          (total, item) => total + (item.price * item.quantity || 0),
          0
        ),
      });
      console.log("Order placed successfully!", response.data);
    } catch (error) {
      console.error("Error processing order:", error);
      setErrors({ general: "An error occurred while processing your order." });
      setLoading(false);
      return;
    }
    console.log("Order details!", {
      name: user.firstName + " " + user.lastName,
      userId: user._id,
      zipCode,
      country,
      province,
      townOrCity,
      streetAddress,
      phone: user.phone,
      email: user.email,
      paymentMethod: "cashOnDelivery",
      items: cartItems,
      status: "pending",
      totalPrice: cartItems.reduce(
        (total, item) => total + (item.price * item.quantity || 0),
        0
      ),
    });
    localStorage.removeItem("cart");
    setCountry("");
    setProvince("");
    setStreetAddress("");
    setTownOrCity("");
    setZIPCode("");
    setErrors({});
    setLoading(false);

    // التنقل الي صفحة شكر
    navigate("/ThankYou");
  };

  return (
    <div
      className="checkout py-5"
      style={{ background: "#f8f9fa", minHeight: "100vh" }}
    >
      <div className="container" style={{ maxWidth: 1100 }}>
        <h1 className="mb-4" style={{ fontWeight: 700, letterSpacing: 1 }}>
          Checkout
        </h1>
        <div className="row">
          {/* Cart Items */}
          <div className="col-md-7 mb-4">
            {/* Billing Details & Summary */}
            <div className="card shadow-sm mb-4 mt-4">
              <div className="card-header bg-white">
                <h4 className="mb-0">Billing Details</h4>
              </div>
              <div className="card-body">
                <Form onSubmit={handleSubmit}>
                  {/* Name */}
                  <Form.Group
                    controlId="formName"
                    className="mb-3 d-flex gap-3"
                  >
                    <FormControl
                      disabled
                      value={user.firstName}
                      aria-label="First Name"
                    />
                    <FormControl
                      disabled
                      value={user.lastName}
                      aria-label="Last Name"
                    />
                  </Form.Group>

                  {/* Country */}
                  <Form.Group controlId="formCountry" className="mb-3">
                    <Form.Label>Country</Form.Label>
                    <Form.Select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      isInvalid={!!errors.country}
                      aria-label="Country"
                      required
                    >
                      <option value="">Select Country</option>
                      {Object.keys(provinces).map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.country}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Street Address */}
                  <Form.Group controlId="formStreetAddress" className="mb-3">
                    <Form.Label>Street Address</Form.Label>
                    <FormControl
                      type="text"
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      isInvalid={!!errors.streetAddress}
                      aria-label="Street Address"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.streetAddress}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Town or city */}
                  <Form.Group controlId="formTownOrCity" className="mb-3">
                    <Form.Label>Town / City</Form.Label>
                    <FormControl
                      type="text"
                      value={townOrCity}
                      onChange={(e) => setTownOrCity(e.target.value)}
                      isInvalid={!!errors.townOrCity}
                      aria-label="Town or city"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.townOrCity}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Province */}
                  <Form.Group controlId="formProvince" className="mb-3">
                    <Form.Label>Province</Form.Label>
                    <Form.Select
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      isInvalid={!!errors.province}
                      aria-label="Province"
                    >
                      <option value="">Select Province</option>
                      {country &&
                        provinces[country]?.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.province}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* ZIP code */}
                  <Form.Group controlId="formZipCode" className="mb-3">
                    <Form.Label>ZIP code</Form.Label>
                    <FormControl
                      type="text"
                      value={zipCode}
                      onChange={(e) => setZIPCode(e.target.value)}
                      isInvalid={!!errors.zipCode}
                      aria-label="ZIP code"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.zipCode}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Phone */}
                  <Form.Group controlId="formPhone" className="mb-3">
                    <FormControl
                      disabled
                      value={user.phone}
                      aria-label="phone"
                    />
                  </Form.Group>

                  {/* Email */}
                  <Form.Group controlId="formEmail" className="mb-3">
                    <FormControl
                      disabled
                      value={user.email}
                      aria-label="email"
                    />
                  </Form.Group>
                </Form>
              </div>
            </div>
          </div>

          {/* Invoice Section */}
          <div className=" col-md-5 p-3">
            <table className="table mb-4">
              <thead>
                <tr>
                  <th>Product</th>
                  <th className="text-end">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <span className="text-muted">{item.title}</span> ×{" "}
                      {item.quantity}
                    </td>
                    <td className="text-end">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
                <tr className="fw-bold">
                  <td>Total</td>
                  <td className="text-end">
                    $
                    {cart
                      .reduce(
                        (sum, item) => sum + item.price * item.quantity,
                        0
                      )
                      .toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="last-action mt-3">
              <h6>
                Cash On Delivery —{" "}
                <span style={{ fontWeight: "300" }}>
                  Pay when you receive your order!
                </span>
              </h6>
              <p>
                We want you to shop with confidence and peace of mind.
                <br />
                With Cash On Delivery, you can pay directly in cash once your
                order is delivered to your doorstep. This way,
                <br />
                you can make sure you’re completely satisfied with your items
                before making the payment — no worries, no risk!
              </p>
              {/* Submit Button */}
              <Button
                variant="primary"
                onClick={handleSubmit}
                className="w-100"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Placing Order...
                  </>
                ) : (
                  "Place Order"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
