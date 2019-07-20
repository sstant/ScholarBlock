import React from "react";

export default class MyDrizzleApp extends React.Component {
  state = { dataKey: null };

  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.Scholarships;

    console.log(contract);

    // get and save the key for the variable we are interested in
    //const dataKey = contract.methods["storedData"].cacheCall();
    //this.setState({ dataKey });
  }

  render() {
    const { Scholarships } = this.props.drizzleState.contracts;
    console.log(Scholarships);

    //const storedData = Scholarships.storedData[this.state.dataKey];

    //console.log(storedData);
    //console.log(storedData.value);

    return (<h1>Hello</h1>)

    //return <DisplayValue value={storedData && storedData.value} />;
  }
}