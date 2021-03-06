import React, { Component } from "react";
import "./App.css";
import classNames from "classnames/bind";
import Navigation from "./Components/Navigation/Navigation";
import Backdrop from "./Components/Products/Backdrop";
import products from "./products.json";
import ProductList from "./Components/Products/ProductList";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			prevScrollpos: window.pageYOffset,
			products: [],
			categorizedProducts: [],
			searchfield: "",
			visible: true,
			searchOpen: false,
			showProductDetails: false,
			showNavMenu: false,
			clickedProduct: {}
		};
	}

	componentDidMount() {
		window.addEventListener("scroll", this.handleScroll);
		this.setState({ products: products.Products.Product });
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll);
	}

	SearchButtonHandler = () => {
		this.setState(prevState => {
			return { searchOpen: !prevState.searchOpen };
		});
	};
	menuButtonHandler = () => {
		this.setState(prevState => {
			return { showNavMenu: !prevState.showNavMenu };
		});
	};
	productClick = e => {
		const products1 = products.Products.Product;
		let product1 = products1.forEach((product, i) => {
			if (products1[i].Product_id === e.target.id) {

				this.setState({ clickedProduct: products1[i] });
				console.log(e.target.id);
			}
		});
		this.setState(prevState => {
			return { showProductDetails: !prevState.showProductDetails };
		});
	};
	categoryClick = e => {
		const products1 = products.Products.Product;
		let product1 = products1.forEach((product, i) => {
			if (products1[i].Product_id === e.target.id) {

				this.setState({ clickedProduct: products1[i] });
				console.log(this.state.clickedProduct);
			}
		});
		this.setState(prevState => {
			return { showProductDetails: !prevState.showProductDetails };
		});
	};
	backdropClickHandler = () => {
		this.setState({ searchOpen: false });
	};
	productBackdropClickHandler = () => {
		this.setState({ showProductDetails: false });
	};
	onKeyPressed = event => {
		if (event.keyCode === 13) {
			this.setState({ searchOpen: false });
			this.setState({ searchfield: event.target.value });
		}
	};

	handleScroll = () => {
		const { prevScrollpos } = this.state;

		const currentScrollPos = window.pageYOffset;
		if (currentScrollPos < 400 || this.state.showNavMenu === true) {
			this.setState({
				visible: true
			});
		} else {
			const visible = prevScrollpos > currentScrollPos;

			this.setState({
				prevScrollpos: currentScrollPos,
				visible
			});
		}
	};

	render() {
		const { products, searchfield } = this.state;
		const filteredProducts = products.filter(products => {
			return products.Product_Name.toLowerCase().includes(
				searchfield.toLowerCase()
			);
		});
		let backdrop;
		if (this.state.showProductDetails) {
			backdrop = <Backdrop click={this.productBackdropClickHandler} />;
		}
		return (
			<div className="App">
				<div>
					<div
						className={classNames("navbar", {
							"navbar--hidden": !this.state.visible
						})}
					>
						<Navigation
							searchButtonClick={this.SearchButtonHandler}
							menuButtonClick={this.menuButtonHandler}
							show={this.state.searchOpen}
							showMenu={this.state.showNavMenu}
							searchChange={this.onSearchChange}
							productList={filteredProducts}
							productDetailsClick={this.productClick}
							enterDown={this.onKeyPressed}
						/>
						{backdrop}
					</div>
				</div>

				<p className="navmask"></p>

				<ProductList
					productDetailsClick={this.productClick}
					className=""
					show={this.state.showProductDetails}
					products={filteredProducts}
					product={this.state.clickedProduct}
				/>
			</div>
		);
	}
}

export default App;
