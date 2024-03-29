import CommentLikeNotification from '@/Components/Notifications/CommentLikeNotification';
import { getMonth, ordinalSuffix } from '@/services';
import CreatedAt from '../CreatedAt';

export default function NotificationItem({ el }) {
    let birhday = '';

    if (el.notifiable_type.includes('User')) {
        const date = new Date(el.data.user.birthday)

        const month = getMonth(date)
        const number = ordinalSuffix(date.getDate())
        birhday = month + " " + number
    }
console.log(el ,' el');
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
                        : (el.notifiable_type.includes('Follower')) ? <CommentLikeNotification
                            userName={el.data.user.name}
                            text="started following you"
                            imagePath={el.data.user.avatar?.avatar}
                        /> : ''
            }
            <CreatedAt createdAt={el.created_at} time={true}/>
        </div>
    )
}