import { useEffect, useRef, useState } from "react";
import { ChatDots, X } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const ChatWidget = () => {
  const quickCommands = [
    "/hello",
    "/contact",
    "/working hours",
    "/return",
    "/cancel order",
    "/wishlist",
    "/payment methods",
    "/discount",
    "/iphone",
    "/review",
    "/support",
    "/feedback",
    "/delivery",
    "/late order",
    "/app not working",
    "/discount",
    "/where is my order",
  ];

const handleQuickCommand = (command) => {
  const reply = getMockReply(command);

  const botQuickReply = {
    from: "bot",
    text: (
      <>
        Try more commands: <br />
        {quickCommands.map((cmd, index) => (
          <span
            key={index}
            onClick={() => handleQuickCommand(cmd)}
            style={{
              display: "inline-block",
              margin: "4px",
              background: "#e0f2fe",
              padding: "6px 10px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "0.9rem",
            }}
          >
            {cmd}
          </span>
        ))}
      </>
    ),
  };

  setMessages((prev) => [
    ...prev,
    botQuickReply,
    { from: "bot", text: reply },
  ]);
};

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Welcome! 👋 You can try the following commands below.",
      isIntro: true,
    },
  ]);
  const [input, setInput] = useState("");

  const getMockReply = (inputText) => {
    const lower = inputText.toLowerCase();

    if (
      lower.includes("hello") ||
      lower.includes("hi") ||
      lower.includes("hey")
    )
      return "Hi there! 👋 How can I help you today?";
    if (lower.includes("how are you"))
      return "I'm just a bot, but I'm doing great! How can I assist you?";

    // Orders & delivery
    if (lower.includes("where is my order") || lower.includes("order status"))
      return;
    <p>
      You can track your order on the{" "}
      <Link to={"/orders"} className="text-decoration-underline">
        Orders page
      </Link>{" "}
      in your account.
    </p>;
    if (lower.includes("delivery") || lower.includes("shipping"))
      return "We deliver within 2–5 business days depending on your location.";
    if (lower.includes("late order") || lower.includes("delayed"))
      return "We're sorry for the delay. Please check your order status or contact support.";

    // Returns
    if (lower.includes("return") || lower.includes("refund"))
      return "You can return any product within 14 days of delivery for a full refund.";
    if (lower.includes("cancel order"))
      return "To cancel your order, go to Orders > Cancel next to the product.";
    if (lower.includes("how to return"))
      return "Visit your Orders page and click 'Return Item' to start the process.";

    // Product questions
    if (lower.includes("price") || lower.includes("cost"))
      return "Can you tell me which product you're asking about?";
    if (lower.includes("warranty"))
      return "Most products come with a 1-year warranty unless stated otherwise.";
    if (
      lower.includes("discount") ||
      lower.includes("offer") ||
      lower.includes("promo")
    )
      return "We often run special promotions! Check the homepage for current deals.";
    if (lower.includes("specs") || lower.includes("specifications"))
      return "You can find the full specifications under the product description.";

    // Technical help
    if (lower.includes("app not working") || lower.includes("site not working"))
      return "Try clearing your browser cache or refreshing the page. Still issues? Contact support.";
    if (lower.includes("payment failed") || lower.includes("transaction error"))
      return "Please make sure your card is valid. Try again or use a different method.";

    // General customer service
    if (lower.includes("support") || lower.includes("help"))
      return "Sure! Let me know what you need help with 😊";
    if (lower.includes("contact") || lower.includes("email"))
      return "You can contact us at support@cyberstore.com or through the contact page.";
    if (lower.includes("working hours") || lower.includes("available time"))
      return "Our support is available 7 days a week from 9am to 9pm.";
    
    // Wishlist / Cart
    if (lower.includes("wishlist"))
      return "You can view and manage your wishlist under the Wishlist page.";
    if (lower.includes("add to cart"))
      return "Simply click 'Add to Cart' on any product page.";

    // Payment methods
    if (lower.includes("payment methods") || lower.includes("how to pay"))
      return "We accept Visa, Mastercard, PayPal, and Cash on Delivery in select regions.";
    if (lower.includes("installment") || lower.includes("monthly payment"))
      return "We support installment options via selected banks and providers.";

    // Suggestions / Feedback
    if (lower.includes("feedback") || lower.includes("suggestion"))
      return "We love hearing from you! Send your feedback to feedback@cyberstore.com.";
    if (lower.includes("review"))
      return "You can leave a review by visiting the product page and scrolling to the review section.";

    // Fallback
    return "Hmm, I didn't quite understand that. Can you try asking in another way?";
  };

  const handleSend = () => {
    if (input.trim() === "") return;

    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const reply = getMockReply(input);
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "bot", text: reply }]);
    }, 600);

    setInput("");
  };
const messagesEndRef = useRef(null);
    useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);

  return (
    <>
      {!open && (
        <button className="chat-button" onClick={() => setOpen(true)}>
          <ChatDots size={22} className="me-2" />
          Chat
        </button>
      )}

      {open && (
        <div className="chatbox">
          <div className="chatbox-header d-flex justify-content-between align-items-center">
            <strong>ChatBot</strong>
            <X
              size={30}
              style={{ cursor: "pointer" }}
              onClick={() => setOpen(false)}
            />
          </div>
          <div className="chatbox-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.from === "user" ? "user" : "bot"}`}
              >
                {msg.text}
              </div>
            ))}

            {/* عرض الأوامر لو أول رسالة */}
            {messages.length === 1 && messages[0].isIntro && (
              <div className="quick-commands">
                {quickCommands.map((cmd, index) => (
                  <span
                    key={index}
                    onClick={() => handleQuickCommand(cmd)}
                    style={{
                      display: "inline-block",
                      margin: "4px",
                      background: "#e0f2fe",
                      padding: "6px 10px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                    }}
                  >
                    {cmd}
                  </span>
                ))}
              </div>
            )}
              <div ref={messagesEndRef} />

          </div>

          <div className="chatbox-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
