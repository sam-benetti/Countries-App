import React, { Component } from 'react';
import { Card, CardTitle, CardText, Table } from 'reactstrap';
import { Link } from 'react-router-dom';

export class Region extends Component {

    constructor(props) {
        super(props);
        console.log(this.props.location);
        this.state = {
                countries: this.props.location.state[0].countries,
                regions: [],
                subregions: []
            }
    }

    componentDidMount() {
        this.populateRegionData();
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
                                    <td>{this.calculateRegionPopulation()}</td>
                                </tr>
                                <tr>
                                    <td><strong>Countries:</strong></td>
                                    <td><ul>{this.state.regions.map((country =>
                                        <li key={country.code}>
                                            <Link to={{
                                                pathname: `/country/` + country.code,
                                                state: [{ id: country.code, countries: this.state.countries }]
                                            }}>{country.name}</Link>
                                        </li>))}</ul></td>
                                </tr>
                                <tr>
                                    <td><strong>Subregions:</strong></td>
                                    <td><ul>{this.state.subregions.map((subregion =>
                                        <li key={subregion}>
                                            <Link to={{
                                                pathname: `/subregion/` + subregion,
                                                state: [{ region: this.props.match.params.id, countries: this.state.countries }]
                                            }}>
                                                {subregion}
                                                </Link>
                                        </li>))}</ul></td>
                                </tr>
                            </tbody>
                        </Table>
                    </CardText>
                </Card>
            </div>
        );
    }

    async populateRegionData() {
        const response = await fetch('home/getregioncountries?region=' + encodeURIComponent(this.props.match.params.id));
        const data = await response.json();
        console.log(data);
        this.setState({ regions: data});
        console.log(this.state.regions);
    }

    async populateSubregionData() {
        const response = await fetch('home/getregionsubregions?region=' + encodeURIComponent(this.props.match.params.id));
        const data = await response.json();
        console.log(data);
        this.setState({ subregions: data });
        console.log(this.state.subregions);
    }

    calculateRegionPopulation() {
        return this.state.regions.reduce((total, value) => total = total + value.population, 0);
    }
}
