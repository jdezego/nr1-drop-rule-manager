import React from "react"
import { NerdGraphQuery, Spinner, Button, Form, TextField, nerdlet, PlatformStateContext, Table, TableHeader, TableHeaderCell, TableRow, TableRowCell } from "nr1"
import { CreateDropRule, DeleteDropRule, ListDropRules } from "./utils"

export default class DropRules extends React.Component {
    componentDidMount() {
        nerdlet.setConfig({
            accountPicker: true,
            timePicker: false,
        })
    }

    getActions() {
        return [
            {
                label: 'Delete Drop Rule',
                type: TableRow.ACTION_TYPE.DESTRUCTIVE,
                onClick: (evt, { item, index }) => {
                    alert(`Delete Drop Rule: ${item.id}`);
                }
            }
        ]
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
                                        return <h2>"Choose an account from the drop-down list."</h2>
                                    }

                                    // No rules found if length of rules array is zero.
                                    if (data.actor.account.nrqlDropRules.list.rules.length == 0) {
                                        return <h2>No rules found.</h2>
                                    }

                                    let rules = data.actor.account.nrqlDropRules.list.rules.map(rule => ({
                                        id: rule.id,
                                        Rule: rule.nrql,
                                        Description: rule.description,
                                        Creator: rule.creator.email
                                    }))

                                    return (
                                        <>
                                            <Table items={rules}>
                                                <TableHeader>
                                                    <TableHeaderCell value={({ item }) => item.Rule}>
                                                        Rule
                                                    </TableHeaderCell>
                                                    <TableHeaderCell value={({ item }) => item.Description}>
                                                        Description
                                                    </TableHeaderCell>
                                                    <TableHeaderCell value={({ item }) => item.Creator}>
                                                        Creator
                                                    </TableHeaderCell>
                                                </TableHeader>

                                                {({ item }) => (
                                                <TableRow actions={this.getActions()}>
                                                    <TableRowCell>{item.Rule}</TableRowCell>
                                                    <TableRowCell>{item.Description}</TableRowCell>
                                                    <TableRowCell>{item.Creator}</TableRowCell>
                                                </TableRow>
                                                )}
                                            </Table>
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
