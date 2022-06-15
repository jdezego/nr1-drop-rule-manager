

// successes array length will be non-zero if the deletion is successful.
// failures array will contain an error and description.
export function DeleteDropRule(accountId, ruleId) {
    const query = `mutation {
        nrqlDropRulesDelete(accountId: ${accountId}, ruleIds: "${ruleId}") {
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
