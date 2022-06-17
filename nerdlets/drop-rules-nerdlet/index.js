import React from "react"
import { NerdGraphQuery, Spinner, Button, Form, TextField, nerdlet } from "nr1"
import { CreateDropRule, DeleteDropRule, ListDropRules, GetAccountId } from './utils';

export default class DropRules extends React.Component {
  componentDidMount() {
    nerdlet.setConfig({
        accountPicker: true,
        timePicker: false
    })
}
    render() {
      // nerdlet.setConfig({
      //   accountPicker: true,
      // })

        // TODO:
        // Get account number of the logged in user. Hard coding now for test purposes.
        // Can we loop through all accounts the user has access to and show drop rules per account?
        
        // This gets the accountId from the dropdown but when I try to use it inside the <NerdGraphQuery> below,it doesn't work.
        // const accountId = <GetAccountId />

        const accountId = 2342752

        return (
            // Using this NerdGraphQuery component for testing. Not sure if it is suitable for this project.
            // Ultimately want to display rules in a NR React Table component.
            <NerdGraphQuery query={ListDropRules(accountId)}>
                {({ loading, error, data }) => {
                    if (loading) {
                        return <Spinner />
                    }

                    if (error) {
                        return "Error!"
                    }

                    // No rules found if length of rules array is zero.
                    if (data.actor.account.nrqlDropRules.list.rules.length == 0) {
                        return <h2>No rules found.</h2>
                    }

                    // TODO:
                    // Use NR React "Table" component to display rules.
                    // Include Table header action "Delete" to delete a rule instead of using Button.
                    // Reference: https://developer.newrelic.com/components/table
                    return (
                      <>
                        <div>
                            {data.actor.account.nrqlDropRules.list.rules.map((rule) => (
                                  <h3>
                                    <p>&nbsp;</p>
                                    <p key={rule.nrql}>Rule: {rule.nrql}</p>
                                    <p key={rule.description}>Description: {rule.description}</p>
                                    <p key={rule.creator.email}>Creator: {rule.creator.email}</p>
                                    <p><Button type={Button.TYPE.DESTRUCTIVE}>Delete Drop Rule</Button></p>
                                  </h3>
                                )
                            )}
                        </div>
                        <div>
                          <p>&nbsp;</p>
                          <p>&nbsp;</p>
                          <p>&nbsp;</p>
                          <h2>Create Drop Rule</h2>
                          <Form>
                            <TextField placeholder="" label="NRQL" />
                            <TextField placeholder="" label="Description" />
                            <Button type={Button.TYPE.PRIMARY}>Create Drop Rule</Button>
                          </Form>
                        </div>
                      </>
                    )
                }}
            </NerdGraphQuery>
        )
    }
}
