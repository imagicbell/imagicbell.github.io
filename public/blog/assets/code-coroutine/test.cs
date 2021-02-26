using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class test : MonoBehaviour {

	private int counter = 0;
	private int counter2 = 0;
	private Stack<IEnumerator> itors;

	// Use this for initialization
	IEnumerator Start () 
	{
		itors = new Stack<IEnumerator>();
		yield return new WaitForSeconds(1);

		//StartCoroutine(Task1());

		itors.Push(Task1());

		StartCoroutine(SimulateCoroutine(Task1()));
	}

	IEnumerator SimulateCoroutine(IEnumerator itorFunc)
	{
		Stack<IEnumerator> stack = new Stack<IEnumerator>();
		stack.Push(itorFunc);
		while (stack.Count > 0)
		{
			IEnumerator itor = stack.Peek();
			bool finished = true;
			while (itor.MoveNext())
			{
				if (itor.Current is IEnumerator)
				{
					stack.Push((IEnumerator) itor.Current);
					finished = false;
					break;
				}

				yield return itor.Current;
			}

			if (finished)
			{
				stack.Pop();
			}
		}
	}

	// void Update()
	// {
	// 	if (itors.Count ==0 ) return;

	// 	bool isContinue;
	// 	do
	// 	{
	// 		isContinue = false;
	// 		IEnumerator itor = itors.Peek();
	// 		bool next = itor.MoveNext();
	// 		if (next)
	// 		{
	// 			//Debug.Log(">>>Update---current---" + itor.Current + "  " + Time.time);
	// 			if (itor.Current is IEnumerator)
	// 			{
	// 				itors.Push((IEnumerator)itor.Current);
	// 				isContinue = true;
	// 			}
	// 		}
	// 		else
	// 		{
	// 			itors.Pop();
	// 			if (itor.Current is IEnumerator)
	// 				isContinue = true;
	// 		}
	// 	}while(isContinue && itors.Count > 0);
	// }

#region Test1
	// IEnumerator Task1()
	// {		
	// 	Debug.Log(">>>Task1---1---" + Time.time);
	// 	yield return Task2(false);

	// 	Debug.Log(">>>Task1---2---" + Time.time);
	// 	yield return Task2(true);

	// 	Debug.Log(">>>Task1---3---" + Time.time);
	// }

	// IEnumerator Task2(bool skip)
	// {
	// 	Debug.Log(">>>Task2---1---skip: " + skip + "  " + Time.time);
	// 	if (!skip)
	// 		yield return 0;
	// 	Debug.Log(">>>Task2---2---skip: " + skip + "  " + Time.time);
	// }
#endregion	

#region Test2
	// IEnumerator Task1()
	// {
	// 	Debug.Log(">>>Task1---begin---" + Time.time);
	// 	yield return Task2();
	// 	Debug.Log(">>>Task1---end---" + Time.time);
	// }
	// IEnumerator Task2()
	// {
	// 	Debug.Log(">>>Task2---1---" + Time.time + "---count: " + counter);
	// 	if (counter++ < 3)
	// 		yield return Task2();
	// 	Debug.Log(">>>Task2---2---" + Time.time + "---count: " + counter);
	// }
#endregion

#region Test3
	IEnumerator Task1()
	{
		Debug.Log(">>>Task1---begin---" + Time.time);
		while (counter2++ < 2)
		{
			counter = 0;
			Debug.Log(">>>Task1---1---" + Time.time + "---count2: " + counter2);
			yield return Task2();
			Debug.Log(">>>Task1---2---" + Time.time + "---count2: " + counter2);
		}	
		Debug.Log(">>>Task1---end---" + Time.time);
	}
	IEnumerator Task2()
	{
		Debug.Log(">>>Task2---begin---" + Time.time);
		yield return Task3();
		Debug.Log(">>>Task2---end---" + Time.time);
	}

	IEnumerator Task3()
	{
		Debug.Log(">>>Task3---begin---" + Time.time+ "---count: " + counter);
		if (counter++ < 1)
			yield return Task3();
		Debug.Log(">>>Task3---end---" + Time.time+ "---count: " + counter);
	}
#endregion

#region TestCmdtor
	// IEnumerator Task1()
	// {
	// 	Debug.Log(">>>Task1---begin---" + Time.time);
	// 	Cmdtor task = Task3();
	// 	yield return task;

	// 	Debug.Log(">>>task.Count : " + task.Count);
	// 	Debug.Log(">>>Task1---end---" + Time.time);
	// }
	
	// IEnumerator Task2()
	// {
	// 	Debug.Log(">>>Task2---1---" + Time.time + "---count: " + counter);
	// 	//yield return new WaitForSeconds(1);
	// 	if (counter++ < 3)
	// 		yield return Task2();
	// 	Debug.Log(">>>Task2---2---" + Time.time + "---count: " + counter);
	// }

	// Cmdtor Task3()
	// {
	// 	Cmdtor cmdtor = new Cmdtor(Task2());
	// 	cmdtor.Count = 4;
	// 	return cmdtor;
	// }
#endregion 

}
