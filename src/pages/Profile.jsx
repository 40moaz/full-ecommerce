import React, { useState } from "react";
import { Modal, Button, Form, Image } from "react-bootstrap";
import Cookies from "js-cookie";
import instance from "../axiosInstance/Instance.jsx";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const classicLabelStyle = {
  color: "#2d2d2d",
  fontWeight: 600,
  fontSize: 16,
  marginBottom: 4,
  fontFamily: "'Georgia', serif",
};

const classicStyles = {
  card: {
    maxWidth: 600,
    margin: "40px auto",
    background: "#fff",
    borderRadius: "12px",
    border: "1px solid #e3e3e3",
    boxShadow: "0 8px 32px rgba(60,60,60,0.10)",
    padding: "32px 36px",
    fontFamily: "'Georgia', serif",
  },
  header: {
    borderBottom: "1px solid #e3e3e3",
    marginBottom: 24,
    paddingBottom: 16,
    textAlign: "center",
  },
  label: {
    color: "#2d2d2d",
    fontWeight: 600,
    fontSize: 16,
    marginBottom: 4,
    fontFamily: "'Georgia', serif",
  },
  value: {
    color: "#444",
    fontSize: 15,
    marginBottom: 12,
    fontFamily: "'Georgia', serif",
  },
  buttonGroup: {
    display: "flex",
    gap: 16,
    marginTop: 32,
    flexWrap: "wrap",
    justifyContent: "center",
  },
};

const Profile = ({ user }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  const [editForm, setEditForm] = useState(user);
  const [passwordForm, setPasswordForm] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarHover, setAvatarHover] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const onLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload(); // لضمان تحديث حالة الـ user
  };

  const uploadImageToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "usersImgs");
    data.append("cloud_name", "ddxwe3wy1");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/ddxwe3wy1/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const result = await res.json();
      return result.secure_url;
    } catch (err) {
      console.error("Upload Error:", err);
      setErrorMessage("Image upload failed.");
      return null;
    }
  };

  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      const response = await instance.delete(`/api/auth/${user._id}`);
      Swal.fire("Deleted!", "Your account has been deleted.", "success");
      Cookies.remove("token");
      window.location.href = "/";
    } catch (error) {
      Swal.fire("Error!", "Failed to delete your account.", error);
    }
  };

  const handleEditSave = async () => {
    setErrorMessage("");
    if (
      !editForm.firstName ||
      !editForm.lastName ||
      !editForm.email ||
      !editForm.password
    ) {
      setErrorMessage("Please fill all fields including current password.");
      return;
    }

    let imageUrl = user.avatar;
    if (editForm.avatar) {
      const uploaded = await uploadImageToCloudinary(editForm.avatar);
      if (!uploaded) return;
      imageUrl = uploaded;
    }

    try {
      const payload = { ...editForm, avatar: imageUrl };
      const response = await instance.put(`/api/auth/${user._id}`, payload);
      toast.success("Profile updated successfully!");
      setShowEdit(false);
      // window.location.reload();
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to update profile.");
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleAvatarSave = async () => {
    if (!avatarFile || !passwordForm.password) {
      setErrorMessage("Please select an image and enter your password.");
      return;
    }
    const uploadedUrl = await uploadImageToCloudinary(avatarFile);
    if (!uploadedUrl) return;

    try {
      await instance.put(`/api/auth/${user._id}`, {
        ...user,
        avatar: uploadedUrl,
        password: passwordForm.password,
      });
      toast.success("Profile picture updated!");
      setShowAvatarModal(false);
      window.location.reload();
    } catch (err) {
      console.log(err);
      setErrorMessage("Failed to update avatar.");
    }
  };

  const handlePasswordSave = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    // send request to update password here if needed
    toast.success("Password updated!");
    setShowPassword(false);
  };
  return (
    <div style={classicStyles.card}>
      <div style={classicStyles.header}>
        {/* Avatar display */}
        <div
          style={{
            position: "relative",
            width: 110,
            height: 110,
            margin: "0 auto 16px",
            cursor: "pointer",
          }}
          onMouseEnter={() => setAvatarHover(true)}
          onMouseLeave={() => setAvatarHover(false)}
          onClick={() => setShowAvatarModal(true)}
        >
          {user.avatar ? (
            <Image
              src={user.avatar}
              roundedCircle
              width={110}
              height={110}
              alt="User Avatar"
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                border: "3px solid #bfa46d",
              }}
            />
          ) : (
            <div
              style={{
                width: 110,
                height: 110,
                borderRadius: "50%",
                background: "#bfa46d",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 48,
                fontWeight: "bold",
                border: "3px solid #bfa46d",
                fontFamily: "'Georgia', serif",
                userSelect: "none",
              }}
            >
              {user.firstName ? user.firstName[0].toUpperCase() : "U"}
            </div>
          )}
          {avatarHover && (
            <span
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,0.4)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: 20,
                borderRadius: "50%",
                pointerEvents: "none",
              }}
            >
              Edit
            </span>
          )}
        </div>
        <h2 style={{ color: "#bfa46d", fontFamily: "'Georgia', serif" }}>
          My Profile
        </h2>
      </div>

      {/* Error display */}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      {/* User info */}
      <div className="mb-3">
        <div style={classicStyles.label}>First Name:</div>
        <div style={classicStyles.value}>{user.firstName}</div>
      </div>
      <div className="mb-3">
        <div style={classicStyles.label}>Last Name:</div>
        <div style={classicStyles.value}>{user.lastName}</div>
      </div>
      <div className="mb-3">
        <div style={classicStyles.label}>Email:</div>
        <div style={classicStyles.value}>{user.email}</div>
      </div>
      <div className="mb-3">
        <div style={classicStyles.label}>Phone:</div>
        <div style={classicStyles.value}>{user.phone || "-"}</div>
      </div>

      {/* Actions */}
      <div style={classicStyles.buttonGroup}>
        <Button variant="outline-primary" onClick={() => setShowEdit(true)}>
          Edit Profile
        </Button>
        <Button variant="outline-warning" onClick={() => setShowPassword(true)}>
          Change Password
        </Button>
        <Button variant="outline-danger" onClick={handleDelete}>
          Delete Account
        </Button>
        <Button variant="outline-secondary" onClick={onLogout}>
          Logout
        </Button>
      </div>
      {/* Edit Profile Modal */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)} centered>
        <Modal.Header closeButton style={{ background: "#f8f8f8" }}>
          <Modal.Title
            style={{ color: "#bfa46d", fontFamily: "'Georgia', serif" }}
          >
            Edit Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "#f8f8f8" }}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label style={classicLabelStyle}>First Name</Form.Label>
              <Form.Control
                placeholder={user.firstName}
                value={editForm.firstName}
                onChange={(e) =>
                  setEditForm({ ...editForm, firstName: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={classicLabelStyle}>Last Name</Form.Label>
              <Form.Control
                placeholder={user.lastName}
                value={editForm.lastName}
                onChange={(e) =>
                  setEditForm({ ...editForm, lastName: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={classicLabelStyle}>Email</Form.Label>
              <Form.Control
                placeholder={user.email}
                type="email"
                value={editForm.email}
                onChange={(e) =>
                  setEditForm({ ...editForm, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label style={classicLabelStyle}>Phone</Form.Label>
              <Form.Control
                placeholder={user.phone}
                value={editForm.phone || ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, phone: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={classicLabelStyle}>Avatar Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setEditForm({ ...editForm, avatar: e.target.files[0] })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={classicLabelStyle}>
                Current Password (required to save changes)
              </Form.Label>
              <Form.Control
                type="password"
                value={editForm.password || ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, password: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ background: "#f8f8f8" }}>
          <Button variant="secondary" onClick={() => setShowEdit(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleEditSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Change Password Modal */}
      <Modal show={showPassword} onHide={() => setShowPassword(false)} centered>
        <Modal.Header closeButton style={{ background: "#f8f8f8" }}>
          <Modal.Title
            style={{ color: "#bfa46d", fontFamily: "'Georgia', serif" }}
          >
            Change Password
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "#f8f8f8" }}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label style={classicLabelStyle}>
                Current Password
              </Form.Label>
              <Form.Control
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    currentPassword: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={classicLabelStyle}>New Password</Form.Label>
              <Form.Control
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    newPassword: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label style={classicLabelStyle}>
                Confirm Password
              </Form.Label>
              <Form.Control
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ background: "#f8f8f8" }}>
          <Button variant="secondary" onClick={() => setShowPassword(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handlePasswordSave}>
            Update Password
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Change Avatar Modal */}
      <Modal
        show={showAvatarModal}
        onHide={() => setShowAvatarModal(false)}
        centered
      >
        <Modal.Header closeButton style={{ background: "#f8f8f8" }}>
          <Modal.Title
            style={{ color: "#bfa46d", fontFamily: "'Georgia', serif" }}
          >
            Change Profile Picture
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "#f8f8f8" }}>
          <Form onSubmit={(e) => e.preventDefault()}>
            <Form.Group className="mb-3">
              <Form.Label style={classicLabelStyle}>Select Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </Form.Group>

            {avatarPreview && (
              <div style={{ textAlign: "center", marginTop: 20 }}>
                <Image
                  src={avatarPreview}
                  roundedCircle
                  width={120}
                  height={120}
                  alt="Preview"
                  style={{ objectFit: "cover", border: "2px solid #aaa" }}
                />
              </div>
            )}

            <Form.Group className="mt-4">
              <Form.Label style={classicLabelStyle}>
                Current Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your current password"
                value={passwordForm.password}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, password: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ background: "#f8f8f8" }}>
          <Button variant="secondary" onClick={() => setShowAvatarModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAvatarSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;
