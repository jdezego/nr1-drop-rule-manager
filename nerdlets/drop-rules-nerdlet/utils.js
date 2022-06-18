//import { PlatformStateContext } from "nr1"

// export function GetAccountId(props) {
//     return (
//         <PlatformStateContext.Consumer>
//             {(platformState) => {
//                 return platformState.accountId
//             }}
//         </PlatformStateContext.Consumer>
//     )
// }

// List drop rules for accountId
export function ListDropRules(accountId) {
  if (accountId == "cross-account") {
    accountId = 1
  }
  
  const query = `{
    actor {
      account(id: ${accountId}) {
        nrqlDropRules {
          list {
            rules {
              id
              nrql
              description
              creator {
                email
              }
            }
          }
        }
      }
    }
  }`
  return query
}

// successes array length will be non-zero if the deletion is successful.
// failures array will contain an error and description.
// Pass an array of comma separated ruleIds to delete if deleting more than one. 
export function DeleteDropRule(accountId, ruleIds) {
    const query = `mutation {
        nrqlDropRulesDelete(accountId: ${accountId}, ruleIds: [${ruleIds}]) {
          successes {
            id
          }
          failures {
            error {
              description
            }
          }
        }
      }`
}

// successes array will contain the ID of the newly created rule if successful.
// failures array should be empty.
export function CreateDropRule(accountId, description, NRQL) {
    const query = `mutation {
        nrqlDropRulesCreate(accountId: ${accountId}, rules: {action: DROP_DATA, description: "${description}", nrql: "${NRQL}"}) {
          failures {
            error {
              description
            }
          }
          successes {
            id
          }
        }
      }`
}
