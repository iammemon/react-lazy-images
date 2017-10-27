import React, { Component } from 'react'

export default (config) => (WrappedComponent) => (
    class IntersectionObserverHOC extends Component {
        state = {
            observer: null
        }
        componentWillMount() {
            this.setState({
                observer: new IntersectionObserver(this._onIntersection, config)
            })
        }
        componentWillUnmount() {
            this.observer.disconnect()
        }
        _onIntersection = (entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return
                this._wrapComponent.onView(entry)
            })
        }
        render() {
            return <WrappedComponent
                ref={instance => this._wrapComponent = instance}
                {...this.props}
                {...this.state} />
        }
    }
)