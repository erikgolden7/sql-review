import React, { Component } from 'react'
import './Products.css'
import axios from 'axios'

export default class Products extends Component {
	constructor() {
		super()

		this.state = {
			products: []
		}

		// this.handleChange = this.handleChange.bind(this)
		// this.createMessage = this.createMessage.bind(this)
		// this.editMessage = this.editMessage.bind(this)
		// this.removeMessage = this.removeMessage.bind(this)
	}

	componentDidMount() {
		axios.get('/api/products').then(response => {
			console.log(response.data)
			this.setState({ products: response.data })
		})
	}

	handleChange(event) {
		this.setState({ text: event.target.value })
	}

	createProduct(event) {
		const { text, user } = this.state
		if (event.key === 'Enter' && text.length !== 0) {
			axios.post(url, { user, text, time: dateCreator() }).then(response => {
				this.setState({ messages: response.data })
			})

			this.setState({ text: '' })
		}
	}
	//
	// editMessage(id, text) {
	// 	console.log('editMessage:', id, text)
	// 	axios.put(url + `/${id}`, { text }).then(response => {
	// 		this.setState({ messages: response.data })
	// 	})
	// }
	//
	// removeMessage(id) {
	// 	axios.delete(url + `/${id}`).then(response => {
	// 		this.setState({ messages: response.data })
	// 	})
	// }

	render() {
		return (
			<div>
				<div>
					{this.state.products.map(product => (
						<ProductItem
							name={product.name}
							description={product.description}
							time={product.price}
						/>
					))}
				</div>

				<div>
					<input
						placeholder="Add a product"
						onKeyPress={this.createProduct}
						onChange={this.handleChange}
						value={this.state.text}
					/>
					<input type="text" />
				</div>
			</div>
		)
	}
}
