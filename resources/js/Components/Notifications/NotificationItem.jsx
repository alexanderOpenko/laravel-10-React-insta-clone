import CommentLikeNotification from '@/Components/Notifications/CommentNotification';

export default function NotificationItem({ el }) {
    return (
        <div className='mb-2'>
            {el.notifiable_type.includes('Like') ?
                <CommentLikeNotification
                    user={el.user}
                    text={"liked your post: " + el.data.post.message}
                    imagePath={el.data.post.images[0].image_path}
                />
                : (el.notifiable_type.includes('Comment')) ? <CommentLikeNotification
                    user={el.user}
                    text={"left a comment on your post: " + el.data.comment}
                    imagePath={el.data.post.images[0].image_path}
                /> : ''
            }
        </div>
    )
}