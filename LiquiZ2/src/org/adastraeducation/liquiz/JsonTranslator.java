package org.adastraeducation.liquiz;

/**
 * Author : Ying Zhao
 */
import java.lang.reflect.Type;
import java.util.ArrayList;

import org.adastraeducation.liquiz.test.TestQuizJavascript;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParseException;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;
import com.google.gson.reflect.TypeToken;

public class JsonTranslator{

	private static Gson gson = null;
	
	public static void  main(String[] args) throws ClassNotFoundException{
	    new JsonTranslator();
		Quiz quiz = TestQuizJavascript.test3();
		String je = gson.toJson(quiz);
//		System.out.println("Quiz Json");
//		System.out.println(je);
		Quiz quiz1 = gson.fromJson(je,  Quiz.class);
//		System.out.println("Quiz Object: ");
//		System.out.println(quiz1);
		String je1 = gson.toJson(quiz1);
		System.out.println("Quiz Json1");
		System.out.println(je1);
		
		
	}
	
	public JsonTranslator(){
		GsonBuilder builder = new GsonBuilder();
		builder.registerTypeAdapter(Quiz.class, new QuizTranslator());
		builder.registerTypeAdapter(PayLoad.class, new PayLoadTranslator());
		builder.registerTypeAdapter(Policy.class, new PolicyTranslator());
		builder.registerTypeAdapter(QuestionContainer.class, new QuestionContainerTranslator());
		// Using serializers of these classes
		builder.registerTypeAdapter(TextInstruction.class, new TextInstructionTranslator());
		builder.registerTypeAdapter(Code.class, new CodeTranslator());
		builder.registerTypeAdapter(Cloze.class, new ClozeTranslator());
		builder.registerTypeAdapter(Match.class, new MatchTranslator());
		// Using deserializer of this class
		builder.registerTypeAdapter(Displayable.class, new DisplayableTranslator());
		
		builder.setPrettyPrinting();
		gson = builder.create();
	}
	
	private class QuizTranslator implements JsonDeserializer<Quiz>, JsonSerializer<Quiz>{

		@Override
		public JsonElement serialize(Quiz quiz, Type arg1, JsonSerializationContext arg2) {
			JsonObject jobj = new JsonObject();
			jobj.addProperty("type", quiz.getType());
			jobj.addProperty("css", quiz.getCss());
			JsonElement payload = arg2.serialize(quiz.getPayload());
			jobj.add("payload", payload);
			
			return jobj;
		}

		@Override
		public Quiz deserialize(JsonElement json, Type arg1, JsonDeserializationContext arg2) throws JsonParseException {
			JsonObject jobj = json.getAsJsonObject();
			Quiz quiz = new Quiz();
			quiz.setType(jobj.get("type").getAsString());
			quiz.setCss(jobj.get("css").getAsString());
			quiz.setPayload(gson.fromJson(jobj.get("payload"), PayLoad.class));
			return quiz;
		}
		
	}
	
	private class PayLoadTranslator implements  JsonDeserializer<PayLoad>, JsonSerializer<PayLoad>{

		@Override
		public JsonElement serialize(PayLoad payload, Type arg1, JsonSerializationContext arg2) {
		    JsonObject jobj = new JsonObject();
		    JsonElement policy = arg2.serialize(payload.getPolicy());
			jobj.add("policy", policy);
//		    jobj.addProperty("policy", payload.getPolicyName());
		    jobj.addProperty("title", payload.getTitle());
		    jobj.addProperty("points", payload.getPoints());
		    jobj.addProperty("timeLimit", payload.getTimeLimit());
		    jobj.addProperty("remainingTries", payload.getRemainingTries());
		    jobj.addProperty("dataDir", payload.getDataDir());
		    jobj.addProperty("editMode", payload.isEditMode());
		    JsonElement questions = arg2.serialize(payload.getQuestions());
			jobj.add("questions", questions);
		    
			return jobj;
		}

		@Override
		public PayLoad deserialize(JsonElement json, Type arg1, JsonDeserializationContext arg2) throws JsonParseException {
		    
			JsonObject jobj = json.getAsJsonObject();
			PayLoad payload = new PayLoad();
			Type qcType = new TypeToken<ArrayList<QuestionContainer>>(){}.getType();
			
			payload.setPolicy(gson.fromJson(jobj.get("policy"), Policy.class));
			
			payload.setTitle(jobj.get("title").getAsString());
			payload.setPoints(jobj.get("points").getAsInt()); 
			payload.setTimeLimit(jobj.get("timeLimit").getAsInt());
			payload.setRemainingTries(jobj.get("remainingTries").getAsInt());
			payload.setDataDir(jobj.get("dataDir").getAsString());
			payload.setEditMode(jobj.get("editMode").getAsBoolean());
			payload.setQuestions((ArrayList<QuestionContainer>) gson.fromJson(jobj.get("questions"), qcType));
			
			return payload;
		}
		
	}
	
	
	private class QuestionContainerTranslator implements  JsonDeserializer<QuestionContainer>, JsonSerializer<QuestionContainer>{

		@Override
		public JsonElement serialize(QuestionContainer qc, Type arg1, JsonSerializationContext arg2) {
		    JsonObject jobj = new JsonObject();
		    jobj.addProperty("id", qc.getId());
		    jobj.addProperty("title", qc.getName());
		    jobj.addProperty("type", qc.getCssClass());
		    JsonElement content = arg2.serialize(qc.getDisplayables());
			jobj.add("content", content);
		    
			return jobj;
		}

		@Override
		public QuestionContainer deserialize(JsonElement json, Type arg1, JsonDeserializationContext arg2) throws JsonParseException {
		    
			JsonObject jobj = json.getAsJsonObject();
			QuestionContainer qc = new QuestionContainer();
			Type dcType = new TypeToken<ArrayList<Displayable>>(){}.getType();
			
			qc.setId(jobj.get("id").getAsInt());
			qc.setQcName(jobj.get("title").getAsString());
			qc.setCssClass(jobj.get("type").getAsString());
			qc.setDisplayables((ArrayList<Displayable>) gson.fromJson(jobj.get("content"), dcType));
			
			return qc;
		}
		
	}
	private class TextInstructionTranslator implements  JsonDeserializer<TextInstruction>, JsonSerializer<TextInstruction>{
		
		@Override
		public JsonElement serialize(TextInstruction text, Type arg1, JsonSerializationContext arg2) {
			JsonArray jobj = new JsonArray();
			JsonPrimitive textName = new JsonPrimitive("instructions");
			JsonPrimitive textContent = new JsonPrimitive(text.getText());
			jobj.add(textName);
			jobj.add(textContent);
			return jobj;
		}
		
		// TODO: 
		@Override
		public TextInstruction deserialize(JsonElement json, Type arg1, JsonDeserializationContext arg2) throws JsonParseException {
			
			JsonArray jobj = json.getAsJsonArray();
			TextInstruction text = new TextInstruction();
			text.setText(jobj.get(1).getAsString());
			
			return text;
		}
		
	}
	private class CodeTranslator implements  JsonDeserializer<Code>, JsonSerializer<Code>{
		
		@Override
		public JsonElement serialize(Code code, Type arg1, JsonSerializationContext arg2) {
			JsonArray jobj = new JsonArray();
			JsonPrimitive codeName = new JsonPrimitive("code");
			JsonPrimitive codeId = new JsonPrimitive(code.getId());
			JsonPrimitive codeText = new JsonPrimitive(code.getDefaultText());
			JsonPrimitive codeRow = new JsonPrimitive(code.getRows());
			JsonPrimitive codeCol = new JsonPrimitive(code.getCols());
			
			jobj.add(codeName);
			jobj.add(codeId);
			jobj.add(codeText);
			jobj.add(codeRow);
			jobj.add(codeCol);
			return jobj;
			
		}
		
		//TODO
		@Override
		public Code deserialize(JsonElement json, Type arg1, JsonDeserializationContext arg2) throws JsonParseException {
			
			JsonArray jobj = json.getAsJsonArray();
			Code code = new Code();
			code.setId(jobj.get(1).getAsInt());
			code.setDefaultText(jobj.get(2).getAsString());
			code.setRows(jobj.get(3).getAsInt());
			code.setCols(jobj.get(4).getAsInt());
			return code;
		}
		
	}
	private class ClozeTranslator implements  JsonDeserializer<Cloze>, JsonSerializer<Cloze>{
		
		@Override
		public JsonElement serialize(Cloze cloze, Type arg1, JsonSerializationContext arg2) {
			JsonArray jobj = new JsonArray();
			JsonPrimitive clozeName = new JsonPrimitive("cloze");
			JsonPrimitive clozeId = new JsonPrimitive(cloze.getId());
			JsonPrimitive clozeText = new JsonPrimitive(cloze.getNoAns());
			
			jobj.add(clozeName);
			jobj.add(clozeId);
			jobj.add(clozeText);
			return jobj;
			
		}
		
		//TODO
		@Override
		public Cloze deserialize(JsonElement json, Type arg1, JsonDeserializationContext arg2) throws JsonParseException {
			

			JsonArray jobj = json.getAsJsonArray();
			Cloze cloze = new Cloze();
			cloze.setId(jobj.get(1).getAsInt());
			cloze.setNoAns(jobj.get(2).getAsString());
			return cloze;
		}
	}
		
		private class PolicyTranslator implements  JsonDeserializer<Policy>, JsonSerializer<Policy>{
			
			@Override
			public JsonElement serialize(Policy policy, Type arg1, JsonSerializationContext arg2) {
				
				JsonObject jobj = new JsonObject();
				jobj.addProperty("policy", policy.getName());
				return jobj;
				
			}
			
			@Override
			public Policy deserialize(JsonElement json, Type arg1, JsonDeserializationContext arg2) throws JsonParseException {
				
				
				JsonObject jobj = json.getAsJsonObject();
				Policy policy = new Policy();
				policy.setName(jobj.get("policy").getAsString());
				return policy;
			}
			
	}
	
	private class MatchTranslator implements  JsonDeserializer<Match>, JsonSerializer<Match>{
		
		@Override
		public JsonElement serialize(Match match, Type arg1, JsonSerializationContext arg2) {
			JsonArray jobj = new JsonArray();
			JsonPrimitive matchName = new JsonPrimitive("match");
			JsonPrimitive matchId = new JsonPrimitive(match.getId());
			JsonArray leftSide = new JsonArray();
			for(Answer answer : match.getLeftSide()){
				JsonPrimitive a = new JsonPrimitive(answer.getName());
				leftSide.add(a);
			}
			JsonArray rightSide = new JsonArray();
			for(Answer answer : match.getRightSide()){
				JsonPrimitive a = new JsonPrimitive(answer.getName());
				rightSide.add(a);
			}
			
			jobj.add(matchName);
			jobj.add(matchId);
			jobj.add(leftSide);
			jobj.add(rightSide);
			return jobj;
			
		}
		
		//TODO
		@Override
		public Match deserialize(JsonElement json, Type arg1, JsonDeserializationContext arg2) throws JsonParseException {
			
			JsonArray jobj = json.getAsJsonArray();
			Match match = new Match();
			match.setId(jobj.get(1).getAsInt());
			JsonArray leftSide = jobj.get(2).getAsJsonArray();
			ArrayList<Answer> left = new ArrayList<>();
			for(int i = 0; i < leftSide.size(); i++){
				left.add(new Answer((DisplayElement)new TextAnswer(leftSide.get(i).getAsString())));
			}
			JsonArray rightSide = jobj.get(3).getAsJsonArray();
			ArrayList<Answer> right = new ArrayList<>();
			for(int i = 0; i < rightSide.size(); i++){
				right.add(new Answer((DisplayElement)new TextAnswer(rightSide.get(i).getAsString())));
			}
			
			match.setLeftSide(left);
			match.setRightSide(right);
			return match;
		}
		
	}
	
	private class DisplayableTranslator implements JsonSerializer<Displayable>, JsonDeserializer<Displayable>{
		
		@Override
		public JsonElement serialize(Displayable arg0, Type arg1, JsonSerializationContext arg2) {
			JsonArray jobj = new JsonArray();
			JsonPrimitive className = new JsonPrimitive(arg0.getClass().getName());
			jobj.add(className);
			System.out.println(className);
//			JsonElement elem = arg2.serialize(arg0, );
			
//			jobj.add(elem);
			return jobj;
		}

		@Override
		public Displayable deserialize(JsonElement json, Type arg1, JsonDeserializationContext arg2)
				throws JsonParseException {
			
			JsonArray jsonArray = json.getAsJsonArray();
			
				JsonPrimitive temp = (JsonPrimitive)jsonArray.get(0);
				String klassString = temp.getAsString();
				char first = Character.toUpperCase(klassString.charAt(0));
				klassString = first+""+ klassString.substring(1,klassString.length());
				klassString = (klassString.equals("Instructions"))? "TextInstruction" : klassString;
				klassString = "org.adastraeducation.liquiz." + klassString;
				Class<?> klass = null;
				
				try{
					klass = Class.forName(klassString);
				}catch(ClassNotFoundException e){
					e.printStackTrace();
					throw new JsonParseException(e.getMessage());
				}
				
				
				return arg2.deserialize(jsonArray, klass);
			}
			
		}
		
	}

	

