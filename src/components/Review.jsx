import React, { useEffect } from 'react'
import instance from '../axiosInstance/Instance'
const Review = ({userId, review}) => {
    const [user, setUser] = React.useState({});
    useEffect(() => {
        async function getUserReviews() {
            try {
                const response = await instance.get(`/api/auth/${userId}`);
                console.log(response.data);
                setUser(response.data.user);
            } catch (error) {
                console.error('Error fetching user reviews:', error);
            }
        }
        getUserReviews();
    }, [userId]);
return (
    <div className="review">
    <div className='d-flex align-items-center gap-3'>
        {user.avatar ? (
            <img
            src={user.avatar}
            alt="User Avatar"
            className='rounded-circle'
            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
            />
        ) : (
            <div
            className='rounded-circle bg-secondary d-flex align-items-center justify-content-center'
            style={{width: '40px', height: '40px', color: '#fff', fontWeight: 'bold', fontSize: '1.2rem' }}
            >
                {user.firstName ? user.firstName.charAt(0).toUpperCase() : ''}
            </div>
        )}
        <div>
            <h6 className='m-0'>{user.firstName} {user.lastName}</h6>
            <p className='m-0' style={{ fontSize: '0.9rem', color: '#999' }}>
                {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'No date available'}
            </p>
        </div>
    </div>
        <p>{review.content}</p>
    </div>
)
}

export default Review;