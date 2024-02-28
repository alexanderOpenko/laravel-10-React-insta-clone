import CommentLikeNotification from '@/Components/Notifications/CommentLikeNotification';
import { getMonth, ordinalSuffix } from '@/services';

export default function NotificationItem({ el }) {
    let birhday = '';

    if (el.notifiable_type.includes('User')) {
        const date = new Date(el.data.user.birthday)

        const month = getMonth(date)
        const number = ordinalSuffix(date.getDate())
        birhday = month + " " + number
    }

    return (
        <div className='mb-2'>
            {el.notifiable_type.includes('Like') ?
                <CommentLikeNotification
                    userName={el.data.user.name}
                    likerId={el.data.liker_id}
                    text={"liked your post: " + el.data.post.message}
                    imagePath={el.data.post.images[0].image_path}
                />
                : (el.notifiable_type.includes('Comment')) ? <CommentLikeNotification
                    userName={el.data.user.name}
                    text={"left a comment on your post: " + el.data.comment}
                    imagePath={el.data.post.images[0].image_path}
                />
                    : (el.notifiable_type.includes('User')) ? <CommentLikeNotification
                        userName={el.data.user.name + "'s"}
                        text="birthday is approaching on"
                        birhday={birhday}
                        imagePath={el.data.user.avatar?.avatar}
                    />
                        : ''
            }
        </div>
    )
}