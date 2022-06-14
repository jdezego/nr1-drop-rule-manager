import React from "react"
import { NerdGraphQuery, Spinner, Button } from "nr1"

export default class DropRules extends React.Component {
    render() {
        // TODO:
        // Get account number of the logged in user. Hard coding now for test purposes.
        // Can we loop through all accounts the user has access to and show drop rules per account?
        const id = 2342752

        // This query returns an array of existing drop rules and some useful attributes.
        const query = `{
            actor {
              account(id: ${id}) {
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

        return (
            // Using this NerdGraphQuery component for testing. Not sure if it is suitable for this project.
            <NerdGraphQuery query={query}>
                {({ loading, error, data }) => {
                    if (loading) {
                        return <Spinner />
                    }

                    if (error) {
                        return "Error!"
                    }

                    // No rules found if length of rules array is zero.
                    if (data.actor.account.nrqlDropRules.list.rules.length == 0) {
                        return "No rules found."
                    }

                    return (
                        <div>
                            {data.actor.account.nrqlDropRules.list.rules.map((rule) => (
                                    <div>
                                      <h2>
                                        <p>&nbsp;</p>
                                        <p key={rule.nrql}>Rule: {rule.nrql}</p>
                                        <p key={rule.creator.email}>Creator: {rule.creator.email}</p>
                                        <p><Button type={Button.TYPE.DESTRUCTIVE}>Delete Drop Rule</Button></p>
                                        <p>&nbsp;</p>
                                      </h2>
                                    </div>
                                )
                            )}
                        </div>
                    )
                }}
            </NerdGraphQuery>
        )
    }
}
