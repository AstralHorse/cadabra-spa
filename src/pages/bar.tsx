import * as React from "react"
const DragSortableList = require('react-drag-sortable').default;

var placeholder = (
    <div className="placeholderContent"> DROP HERE ! </div>
);

var list = [
 	{content: (<span>test1</span>), classes:['test', 'bigger']},
 	{content: (<span>test2</span>), classes:['test']},
 	{content: (<span>test3</span>), classes:['test']},
 	{content: (<span>test4</span>), classes:['test', 'bigger']}
];

var listHorizontal = [
 	{content: (<div>test1</div>), classes:['bigger']},
 	{content: (<div>test2</div>)},
 	{content: (<div>test3</div>), classes:['bigger']},
 	{content: (<div>test4</div>)}
];

var listGrid = [
    {content: (<div>test1</div>)},
 	{content: (<div>test2</div>)},
 	{content: (<div>test3</div>)},
    {content: (<div>test4</div>)},
    {content: (<div>test5</div>)},
    {content: (<div>test6</div>)},
    {content: (<div>test7</div>)},
    {content: (<div>test8</div>)},
 	{content: (<div>test9</div>)}
];

 var onSort = function(sortedList: any) {
 	console.log("sortedList", sortedList);
 }

export class Bar extends React.Component<{
}> {
    state = {
    }

    componentWillMount() {
    }

    render() {
        console.log(DragSortableList)
        return (
            <div>
                <DragSortableList items={list} moveTransitionDuration={0.3} onSort={onSort} type="vertical"/>
                <DragSortableList items={listHorizontal} moveTransitionDuration={0.3} dropBackTransitionDuration={0.3} placeholder={placeholder} onSort={onSort} type="horizontal"/>
                <DragSortableList items={listGrid} dropBackTransitionDuration={0.3} onSort={onSort} type="grid"/>
            </div>
        );
    }
}
