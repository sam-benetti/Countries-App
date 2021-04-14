import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';
import * as utils from './Utilities/utils.js'; 


export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = { countries: [], loading: true };
    }

    componentDidMount() {
        this.populateCountryData();
    }

    static renderCountriesTable(countries) {
        return (
            <div>
                <h1>Countries of the World!</h1>
                <p>Please select a country to see more information</p>
                <Table hover aria-labelledby="countriesLabel">
                    <thead>
                        <tr>
                            <th>Country</th>
                            <th>Region</th>
                            <th>Subregion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {countries.map(country =>
                            <tr key={country.code}>
                                <td>
                                    <Link to={{
                                        pathname: `/country/` + country.code,
                                        state: [{id: country.code, countries: countries }]
                                    }}>
                                        {country.name}
                                    </Link>
                                </td>
                                <td>
                                    <Link to={{
                                        pathname: `/region/` + country.region,
                                        state: [{countries: countries}]
                                    }}>
                                        {country.region}
                                    </Link>
                                </td>
                                <td>{country.subRegion}</td>
                            </tr>
                            )}
                        </tbody>
                    </Table>
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Home.renderCountriesTable(this.state.countries);

        return (
            <div>
                {contents}
            </div>
        );
    }

    async populateCountryData() {
        const response = await fetch('home/getcountries');
        const data = await response.json();
        this.setState({ countries: data, loading: false });
    }
}
