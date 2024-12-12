import { activityLog } from "./schema/activity";
import { 
  collections, 
  userStash, 
  collectionLinks, 
  collectionAccess,
  type Collection,
  type NewCollection,
  type UserStash,
  type NewUserStash
} from "./schema/collections";
import { 
  domains, 
  globalLinks, 
  links,
  type Domain,
  type NewDomain,
  type GlobalLink,
  type NewGlobalLink,
  type Link,
  type NewLink
} from "./schema/links";
import { 
  users,
  type User,
  type NewUser 
} from "./schema/users";
import { 
  tags, 
  linkTags,
  type Tag,
  type NewTag 
} from "./schema/tags";
import { accounts, sessions, verificationTokens } from "./schema/auth";

// Export all tables
export const schema = {
  // Auth & Users
  users,
  
  // Core tables
  domains,
  globalLinks,
  links,
  
  // Collections & Organization
  userStash,
  collections,
  collectionLinks,
  collectionAccess,
  
  // Tags
  tags,
  linkTags,
  
  // Logging
  activityLog,
  accounts,
  sessions,
  verificationTokens,
};

// Export individual tables and types
export {
  // Auth & Users
  users,
  type User,
  type NewUser,
  
  // Core tables
  domains,
  globalLinks,
  links,
  type Domain,
  type NewDomain,
  type GlobalLink,
  type NewGlobalLink,
  type Link,
  type NewLink,
  
  // Collections & Organization
  userStash,
  collections,
  collectionLinks,
  collectionAccess,
  type Collection,
  type NewCollection,
  type UserStash,
  type NewUserStash,
  
  // Tags
  tags,
  linkTags,
  type Tag,
  type NewTag,
  
  // Logging
  activityLog,
  accounts,
  sessions,
  verificationTokens,
};