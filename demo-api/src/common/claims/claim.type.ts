import CommentClaim from "./comment.claim";
import PostClaim from "./post.claim";

const Claim = {
  ...PostClaim,
  ...CommentClaim
};

type Claim =
  | PostClaim
  | CommentClaim;

export default Claim;
