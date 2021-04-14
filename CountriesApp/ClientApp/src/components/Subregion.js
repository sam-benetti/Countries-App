import React, { Component } from 'react';
import { Card, CardTitle, CardText, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import * as utils from './Utilities/utils.js'; 


export class Subregion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: this.props.location.state[0].countries,
            region: this.props.location.state[0].region,
            subregions: []
        }
    }

    componentDidMount() {
        this.populateSubregionData();
    }

    render() {
        return (
            <div>
                <Card body>
                    <CardTitle tag="h3">{this.props.match.params.id}</CardTitle>
                    <CardText>
                        <Table borderless>
                            <tbody>
                                <tr>
                                    <td><strong>Total Population:</strong></td>
                                    <td>{utils.calculatePopulation(this.state.subregions)}</td>
                                </tr>
                                <tr>
                                    <td><strong>Region:</strong></td>
                                    <td>
                                        <Link to={{
                                            pathname: `/region/` + this.state.region
                                        }}>
                                            {this.state.region}
                                        </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Countries:</strong></td>
                                    <td><ul>{this.state.subregions.map((country =>
                                        <li key={country.code}><Link to={{
                                            pathname: `/country/` + country.code,
                                            state: [{ id: country.code, countries: this.props.location.state[0].countries }]
                                        }}>{country.name}</Link></li>))}</ul></td>
                                </tr>
                            </tbody>
                        </Table>
                    </CardText>
                </Card>
            </div>
            );
    }

    async populateSubregionData() {
        const response = await fetch('home/getsubregions?subregion=' + encodeURIComponent(this.props.match.params.id));
        const data = await response.json();
        console.log(data);
        this.setState({ subregions: data });
        console.log(this.state.subregions);
    }
}