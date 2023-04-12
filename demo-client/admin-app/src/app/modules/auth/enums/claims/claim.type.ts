import CommentClaim from './comment.claim';
import PostClaim from './post.claim';
import UserClaim from './user.claim';

const Claim = {
  ...PostClaim,
  ...CommentClaim,
  ...UserClaim,
};

type Claim = PostClaim | CommentClaim | UserClaim;

export default Claim;
