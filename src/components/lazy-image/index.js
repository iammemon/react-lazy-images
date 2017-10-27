import React, { Component } from 'react';
import { object, string, number } from 'prop-types'
import './index.css'

class LazyImage extends Component {
    state = {
        visible: this.props.visibleId === this.props.id,
        fade: false
    }

    static propTypes = {
        id: string.isRequired,
        visibleId: string.isRequired,
        observer: object.isRequired,
        base64Img: string.isRequired,
        src: string.isRequired,
        srcset: string,
        sizes: string,
        aspectratio: number,
    }
    componentWillReceiveProps(nextProps) {
        if (!this.state.visible && nextProps.visibleId === this.props.id) {
            this.setState({
                visible: true
            })
        }
    }

    componentDidMount() {
        this.props.observer.observe(this._el)
    }
    componentWillUnmount() {
        this.props.observer.unobserve(this._el)
    }
    _onImageLoad = () => {
        this.setState({
            fade: true
        })
        this.props.observer.unobserve(this._el)
    }

    render() {

        const { id, sizes, srcset, src, base64Img, aspectratio } = this.props
        return (
            <div
                className='img-container'
                style={{
                    backgroundImage: `url(${base64Img})`,
                    paddingTop: `${aspectratio}%`
                }}
                data-id={id}
                ref={el => this._el = el}>
                {
                    this.state.visible
                    && <img className={this.state.fade ? 'fade-in' : ''}
                        sizes={sizes}
                        src={src}
                        srcSet={srcset}
                        onLoad={this._onImageLoad}
                        alt='' />
                }

            </div>
        );
    }
}

export default LazyImage;