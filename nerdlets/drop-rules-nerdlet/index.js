import React from "react"
import { NerdGraphQuery, Spinner, Button, Form, TextField, nerdlet, PlatformStateContext } from "nr1"
import { CreateDropRule, DeleteDropRule, ListDropRules } from "./utils"

export default class DropRules extends React.Component {
    componentDidMount() {
        nerdlet.setConfig({
            accountPicker: true,
            timePicker: false,
        })
    }
    render() {
        return (
            <PlatformStateContext.Consumer>
                {(platformState) => {
                    if (platformState && !isNaN(platformState.accountId)) {
                        return (
                            <NerdGraphQuery query={ListDropRules(platformState.accountId)}>
                                {({ loading, error, data }) => {
                                    if (loading) {
                                        return <Spinner />
                                    }

                                    if (error) {
                                        return <h2>"Error! Choose an account from the drop-down list."</h2>
                                    }

                                    // No rules found if length of rules array is zero.
                                    if (data.actor.account.nrqlDropRules.list.rules.length == 0) {
                                        return <h2>No rules found.</h2>
                                    }

                                    return (
                                        <>
                                            <div>
                                                {data.actor.account.nrqlDropRules.list.rules.map((rule) => (
                                                        <h3>
                                                            <p>&nbsp;</p>
                                                            <p key={rule.nrql}>Rule: {rule.nrql}</p>
                                                            <p key={rule.descriptio}>Description: {rule.description}</p>
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
                }}
            </PlatformStateContext.Consumer>
        )
    }
}
