// 输入
[{
    id: 0,
    pid: 'root'
},
{
    id: 1,
    pid: 0
},{
    id: 2,
    pid: 0
},{
    id: 3,
    pid: 1
},{
    id: 4,
    pid: 2
},{
    id: 5,
    pid: 2
}]
// 输出
[{
	id: 0,
	pid: 'root',
	children: [
		{
            id: 1,
            pid: 0,
			children: [
				{
                    id: 3,
                    pid: 1
                }
			]
        }
	]
}]