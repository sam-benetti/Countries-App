import React, { Component } from 'react';
import { Card, CardTitle, CardText, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import './Country.css';

export class Country extends Component {
    constructor(props) {
        super(props);
        if (this.props.location.state) {
            this.state = {
                id: this.props.match.params.id,
                countries: this.props.location.state[0].countries
            }
        }
        else {
            this.props.history.push("/");
        }
    }

    findCountry(id) {
        return this.state.countries.find(country => country.code === id);
    }

    render() {
        const country = this.findCountry(this.state.id);

        return (
            <div>
                <Card body>
                    <CardTitle tag="h3">{country.name}</CardTitle>
                    <CardText>
                        <Table>
                            <tbody>
                                <tr>
                                    <td><strong>Capital City:</strong></td>
                                    <td>{country.capital}</td>
                                </tr>
                                <tr>
                                    <td><strong>Total Population:</strong></td>
                                    <td>{country.population}</td>
                                </tr>
                                <tr>
                                    <td><strong>Currencies:</strong></td>
                                    <td><ul>{country.currencies.map(currency =>
                                        <li key={currency.code}>{currency.name}</li>)}</ul></td>
                                </tr>
                                <tr>
                                    <td><strong>Languages:</strong></td>
                                    <td><ul>{country.languages.map((language =>
                                        <li key={language.isO639_1}>{language.name}</li>))}</ul></td>
                                </tr>
                                <tr>
                                    <td><strong>Neighbouring Countries:</strong></td>
                                    <td><ul>{country.borders.map((border =>
                                        <li key={border}>
                                            <Link to={{
                                                pathname: `/country/` + border,
                                                state: [{ id: border, countries: this.props.location.state[0].countries }]
                                            }}>{this.findCountry(border).name}</Link>
                                        </li>))}</ul></td>
                                </tr>
                            </tbody>
                        </Table>
                    </CardText>
                </Card>
            </div>
        );
    }
}