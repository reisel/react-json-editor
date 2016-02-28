import React, { PropTypes, Component } from 'react';

import AddInput from './AddInput'

const style = {
  'display': 'inline-block',
  'marginLeft': '0.1rem'
};

class ValueItem extends Component {

  static propTypes = {
    index: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.boolean
    ]).optional,
    propagateChanges: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      hover: false
    };
  };

  mouseOver = () => {
    this.setState({hover: true});
  };

  mouseOut = () => {
    this.setState({hover: false});
  };

  onChange = (index, value) => {
    // ignore
  };

  onDone = (index, value) => {
    this.propagateChanges(value)
  };

  propagateChanges(value){
    this.setState({editing: false});

    if(this.props.propagateChanges && this.props.value != value) {
      this.props.propagateChanges('update', this.props.index, value);
    }
  }

  propagateDelete() {
    if(this.props.propagateChanges) {
      this.props.propagateChanges('delete', this.props.index);
    }
  }

  onDelete = (event) => {
    event.stopPropagation();
    this.propagateDelete();
  };

  activateEdit = (event) => {
    this.setState({editing: true});
  };

  value() {
    return this.props.value.toString();
  }

  getClass() {
    return typeof this.props.value;
  }

  getStyle() {
    return style;
  }

  getSuffix() {
    return null;
  }

  editSettings() {
    return {
      type: typeof this.props.value,
      defaultValue: this.props.value,
      multiple: true
    };
  }

  renderEdit(){
    const settings = this.editSettings();
    return <AddInput index={0} autoFocus={false} onChange={this.onChange} onDone={this.onDone} {...settings}/>
  }

  renderValue(){
    return (
      <div className={this.getClass()} style={this.getStyle()} onClick={this.activateEdit}
      onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
      <span>{this.value()}{this.getSuffix()}</span>
        {this.renderDelete()}
      </div>
    );
  }

  renderDelete() {
    const style = {float: 'right', 'marginLeft': '0.5em'};
    style['visibility'] = this.state.hover ? 'visible' : 'hidden';
    return <button className="delete" onClick={this.onDelete} style={style}>{'\u232B'}</button>;
  }

  render() {
    return this.state.editing ? this.renderEdit() : this.renderValue();
  }
}

export default ValueItem;
