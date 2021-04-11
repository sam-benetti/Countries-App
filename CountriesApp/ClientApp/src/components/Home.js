import React, { Component } from 'react';

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
                <table className='table table-hover' aria-labelledby="countriesLabel">
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
                                <td><a href='#'>{country.name}</a></td>
                                <td><a href='#'>{country.region}</a></td>
                                <td><a href='#'>{country.subRegion}</a></td>
                            </tr>
                        )}
                    </tbody>
                </table>
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
        const response = await fetch('home');
        console.log(response);
        const data = await response.json();
        console.log(data);
        this.setState({ countries: data, loading: false });
    }
}
