import React, { Component } from 'react';
import InputRadio from './InputRadio';
import SelectTreeBreadcrumb from './SelectTreeBreadcrumb';
import cloneDeep from 'lodash.clonedeep';
import Icon from '../Icon';
import Button, { ButtonEnums } from '../Button';
import { LabelInfo } from '../Labelling/LabellingFlow';

interface PropType {
  autoFocus: boolean;
  searchEnabled: boolean;
  selectTreeFirstTitle: string;
  items: Array<LabelInfo>;
  onSelected: Function;
  exclusive: boolean;
  closePopup: Function;
  label: string;
  columns: number;
}

interface StateProps {
  searchTerm: string | null;
  currentNode: any;
  value: string | null;
  focusedIndex: number;
}

export class SelectTree extends Component<PropType> {
  state: StateProps;
  static defaultProps = {
    searchEnabled: true,
    autoFocus: true,
    selectTreeFirstTitle: 'First Level itens',
    items: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      searchTerm: this.props.items.length > 0 ? null : this.props.label,
      currentNode: null,
      value: null,
      focuseIndex: 0,
    };
  }

  render() {
    const treeItems = this.getTreeItems();

    return (
      <div className="max-h-80 w-80 text-base leading-7">
        <div className="bg-[#090909] relative flex max-h-80 w-full flex-col overflow-hidden rounded-lg border border-[#1c1c1e] text-white outline-none focus:outline-none">
          {this.headerItem()}

          {this.props.items.length > 0 && (
            <div className="ohif-scrollbar h-full overflow-auto">
              {this.state.currentNode && (
                <SelectTreeBreadcrumb
                  onSelected={this.onBreadcrumbSelected}
                  label={this.state.currentNode.label}
                  value={this.state.currentNode.value}
                />
              )}
              <div>
                <div>{treeItems}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  isLeafSelected = item => item && !Array.isArray(item.items);

  filterItems() {
    const filteredItems = [];
    const rawItems = cloneDeep(this.props.items);
    rawItems.forEach(item => {
      if (Array.isArray(item.items)) {
        item.items.forEach(item => {
          const label = item.label.toLowerCase();
          const searchTerm = this.state.searchTerm.toLowerCase();
          if (label.indexOf(searchTerm) !== -1) {
            filteredItems.push(item);
          }
        });
      } else {
        const label = item.label.toLowerCase();
        const searchTerm = this.state.searchTerm.toLowerCase();
        if (label.indexOf(searchTerm) !== -1) {
          filteredItems.push(item);
        }
      }
    });
    return filteredItems;
  }

  getTreeItems() {
    const storageKey = 'SelectTree';
    let treeItems: Array<LabelInfo>;

    if (this.state.searchTerm) {
      const filterItems = this.filterItems();
      if (
        this.props.exclusive === false &&
        filterItems.find(item => item.label === this.state.searchTerm) === undefined
      ) {
        treeItems = [
          { label: this.state.searchTerm, value: this.state.searchTerm },
          ...filterItems,
        ];
      } else {
        treeItems = filterItems;
      }
    } else if (this.state.currentNode) {
      treeItems = cloneDeep(this.state.currentNode.items);
    } else {
      treeItems = cloneDeep(this.props.items);
    }

    return treeItems.map((item, index) => {
      const itemKey = index;
      return (
        <InputRadio
          key={itemKey}
          id={`${storageKey}_${item.value}`}
          itemData={item}
          value={item.value}
          label={item.label}
          onSelected={this.onSelected}
          index={index}
          selectTree={this}
        />
      );
    });
  }

  handleKeyDown = event => {
    const { key } = event;
    const { focusedIndex } = this.state;
    const treeItems = this.getTreeItems();

    if (key === 'ArrowUp') {
      this.setState(prevState => ({
        focusedIndex:
          prevState.focusedIndex > 0 ? prevState.focusedIndex - 1 : treeItems.length - 1,
      }));
    } else if (key === 'ArrowDown') {
      this.setState(prevState => ({
        focusedIndex:
          prevState.focusedIndex < treeItems.length - 1 ? prevState.focusedIndex + 1 : 0,
      }));
    } else if (key === 'Enter') {
      const selectedItem = this.state.searchTerm
        ? { label: this.state.searchTerm, value: this.state.searchTerm }
        : treeItems[focusedIndex].props.itemData;
      this.onSelected(event, selectedItem);
    }
  };

  onSubmitHandler = evt => {
    this.props.onSelected(evt, {
      label: this.state.searchTerm,
      value: this.state.searchTerm,
    });
  };

  headerItem = () => {
    const inputLeftPadding = this.props.items.length > 0 ? 'pl-8' : 'pl-4';
    const title = this.props.selectTreeFirstTitle;

    return (
      <div className="flex flex-col justify-between border-b-2 border-solid border-[#1c1c1e] p-4 ">
        <div className="text-common-bright m-0 mb-5 p-2 leading-tight">
          <span className="text-common-bright align-sub text-xl">{title}</span>
          <div className="float-right">
            <Icon
              name="icon-close"
              className="cursor-pointer"
              onClick={() => this.props.closePopup()}
              fill="#a3a3a3"
            />
          </div>
        </div>
        {this.props.searchEnabled && (
          <div className="flex w-full flex-col">
            {this.props.items.length > 0 && (
              <div className="absolute mt-2 mr-2.5 mb-3 ml-3 h-4 w-4">
                <Icon
                  name="icon-search"
                  fill="#a3a3a3"
                />
              </div>
            )}
            <input
              data-cy="input-annotation"
              type="text"
              className={`border-common-bright b appearance-none rounded border bg-[#090909] py-2 pr-3 text-sm leading-tight shadow transition duration-300 hover:border-gray-500 focus:border-gray-500 focus:outline-none ${inputLeftPadding}`}
              placeholder={this.props.items.length > 0 ? 'Search labels' : 'Enter label'}
              autoFocus={this.props.autoFocus}
              onChange={this.searchLocations}
              value={this.state.searchTerm ? this.state.searchTerm : ''}
              onKeyDown={this.handleKeyDown}
            />
          </div>
        )}
        {this.props.items.length === 0 && (
          <div className="flex justify-end py-3">
            <button
              className='hover:bg-primary-light/50 border-primary-light/50 w-full flex items-center justify-center gap-2 rounded-md border p-2 py-1 text-[13px] capitalize text-white'
              disabled={this.state.searchTerm === ''}
              key={0}
              name="save"
              onClick={this.onSubmitHandler}
            >
              Save
            </button>
          </div>
        )}
      </div>
    );
  };

  searchLocations = evt => {
    this.setState({
      currentNode: null,
      searchTerm: evt.currentTarget.value,
    });
  };

  onSelected = (event, item) => {
    if (this.isLeafSelected(item)) {
      this.setState({
        searchTerm: null,
        currentNode: null,
        value: null,
      });
    } else {
      this.setState({
        currentNode: item,
      });
    }
    return this.props.onSelected(event, item);
  };

  onBreadcrumbSelected = () => {
    this.setState({
      currentNode: null,
    });
  };
}
