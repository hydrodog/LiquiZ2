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
		String je = "";
		je = gson.toJson(quiz);
		System.out.println(je);
//		Quiz quiz1 = gson.fromJson(je,  Quiz.class);
//		 System.out.println(quiz1);
		
		
		
//		final int n = (int)1e6;
//		long t0 = System.nanoTime();
//        for(int i = 0; i < n; i++){
//        	  je = gson.toJson(quiz);
//        }
//        long t1 = System.nanoTime() - t0;
//        
//        System.out.println("the average serializing time is: " + (double)(t1)/n/1.0e9);
//        
//	    System.out.println(je);
//        
//		  long t2 = System.nanoTime();
//		  for(int i = 0; i < n; i++){
//			   quiz1 = gson.fromJson(je,  Quiz.class);
//		  }
//		  
//		  long t3 = System.nanoTime() - t2;  
//		  
//		  System.out.println("the average deserializing time is: " + (double)(t3)/n/1.0e9);
		 
		Quiz quiz1 = gson.fromJson(je,  Quiz.class);
		System.out.println("Quiz Object: ");
		System.out.println(quiz1);
		String je1 = gson.toJson(quiz1);
		System.out.println("Quiz Json1");
		System.out.println(je1);
		
	}
	
	
	
	public static Gson getGson() {
		return gson;
	}



	public static void setGson(Gson gson) {
		JsonTranslator.gson = gson;
	}



	public JsonTranslator(){
		GsonBuilder builder = new GsonBuilder();
		builder.registerTypeAdapter(Quiz.class, new QuizTranslator());
		builder.registerTypeAdapter(PayLoad.class, new PayLoadTranslator());
//		builder.registerTypeAdapter(Policy.class, new PolicyTranslator());
		builder.registerTypeAdapter(QuestionContainer.class, new QuestionContainerTranslator());
		// Using serializers of these classes
		builder.registerTypeAdapter(TextInstruction.class, new TextInstructionTranslator());
		builder.registerTypeAdapter(Code.class, new CodeTranslator());
		builder.registerTypeAdapter(Cloze.class, new ClozeTranslator());
		builder.registerTypeAdapter(Match.class, new MatchTranslator());
		builder.registerTypeAdapter(Matrix.class, new MatrixTranslator());
		builder.registerTypeAdapter(LineBreak.class, new LineBreakTranslator());
		builder.registerTypeAdapter(TextSpan.class, new TextSpanTranslator());
		builder.registerTypeAdapter(MatrixQuestion.class, new MatrixQuestionTranslator());
		builder.registerTypeAdapter(FileUpload.class, new FileUploadTranslator());
		builder.registerTypeAdapter(Image.class, new ImageTranslator());
		builder.registerTypeAdapter(FillIn.class, new FillInTranslator());
		builder.registerTypeAdapter(TextP.class, new TextPTranslator());
		builder.registerTypeAdapter(Audio.class, new AudioTranslator());
		builder.registerTypeAdapter(Video.class, new VideoTranslator());
		builder.registerTypeAdapter(Essay.class, new EssayTranslator());
		builder.registerTypeAdapter(MultiChoiceRadio.class, new MultiChoiceRadioTranslator());
		// Using deserializer of this class
		builder.registerTypeAdapter(Displayable.class, new DisplayableTranslator());
		
		builder.setPrettyPrinting().disableHtmlEscaping();
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
//		    JsonElement policy = arg2.serialize(payload.getPolicy());
//			jobj.add("policy", policy);
		    jobj.addProperty("policy", payload.getPolicyName());
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
			
//			payload.setPolicy(gson.fromJson(jobj.get("policy"), Policy.class));
			payload.setPolicy(new Policy(jobj.get("policy").getAsString()));
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
	
private class FileUploadTranslator implements  JsonDeserializer<FileUpload>, JsonSerializer<FileUpload>{
		
		@Override
		public JsonElement serialize(FileUpload file, Type arg1, JsonSerializationContext arg2) {
			JsonArray jobj = new JsonArray();
			JsonPrimitive fileName = new JsonPrimitive("file");
			JsonPrimitive text = new JsonPrimitive("Upload File");
			JsonPrimitive label = new JsonPrimitive(file.getLabel());
			JsonPrimitive text1 = new JsonPrimitive("file-input");
			JsonPrimitive fileId = new JsonPrimitive(file.getId());
			jobj.add(fileName);
			jobj.add(text);
			jobj.add(label);
			jobj.add(text1);
			jobj.add(fileId);
			return jobj;
		}
		
		// TODO: 
		@Override
		public FileUpload deserialize(JsonElement json, Type arg1, JsonDeserializationContext arg2) throws JsonParseException {
			
			JsonArray jobj = json.getAsJsonArray();
			FileUpload file = new FileUpload();
			file.setLabel(jobj.get(2).getAsString());
			file.setId(jobj.get(4).getAsInt());
			return file;
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
				policy.setName(jobj.getAsString());
				return policy;
			}
			
	}
	
private class LineBreakTranslator implements  JsonDeserializer<LineBreak>, JsonSerializer<LineBreak>{
			
			@Override
			public JsonElement serialize(LineBreak lineBreak, Type arg1, JsonSerializationContext arg2) {
				
				JsonArray jobj = new JsonArray();
				jobj.add(new JsonPrimitive("Util.br")); 
				return jobj;
				
			}
			
			@Override
			public LineBreak deserialize(JsonElement json, Type arg1, JsonDeserializationContext arg2) throws JsonParseException {
				return new LineBreak();
			}
			
	}

private class ImageTranslator implements  JsonDeserializer<Image>, JsonSerializer<Image>{
	
	@Override
	public JsonElement serialize(Image image, Type arg1, JsonSerializationContext arg2) {
		
		JsonArray jobj = new JsonArray();
		jobj.add(new JsonPrimitive("Util.image")); 
		jobj.add(new JsonPrimitive(image.getSource()));
		return jobj;
		
	}
	
	@Override
	public Image deserialize(JsonElement json, Type arg1, JsonDeserializationContext arg2) throws JsonParseException {
		JsonArray array = json.getAsJsonArray();
		Image image = new Image();
		image.setSource(array.get(1).getAsString());
		return image;
	}
	
}

private class VideoTranslator implements  JsonDeserializer<Video>, JsonSerializer<Video>{
	
	@Override
	public JsonElement serialize(Video video, Type arg1, JsonSerializationContext arg2) {
		
		JsonArray jobj = new JsonArray();
		jobj.add(new JsonPrimitive("Util.video")); 
		jobj.add(new JsonPrimitive(video.getSource()));
		return jobj;
		
	}
	
	@Override
	public Video deserialize(JsonElement json, Type arg1, JsonDeserializationContext arg2) throws JsonParseException {
		JsonArray array = json.getAsJsonArray();
		Video video = new Video();
		video.setSource(array.get(1).getAsString());
		return video;
	}
	
}

private class EssayTranslator implements  JsonDeserializer<Essay>, JsonSerializer<Essay>{
	
	@Override
	public JsonElement serialize(Essay essay, Type arg1, JsonSerializationContext arg2) {
		
		JsonArray jobj = new JsonArray();
		jobj.add(new JsonPrimitive("essay")); 
		jobj.add(essay.getId());
		jobj.add(essay.getRows());
		jobj.add(essay.getCols());
		jobj.add(essay.getMaxWords());
		return jobj;
		
	}
	
	@Override
	public Essay deserialize(JsonElement json, Type arg1, JsonDeserializationContext arg2) throws JsonParseException {
		JsonArray array = json.getAsJsonArray();
		Essay essay = new Essay();
		essay.setId(array.get(1).getAsInt());
		essay.setRows(array.get(2).getAsInt());
		essay.setCols(array.get(3).getAsInt());
		essay.setMaxWords(array.get(4).getAsInt());
		return essay;
	}
	
}
private class TextPTranslator implements  JsonDeserializer<TextP>, JsonSerializer<TextP>{
	
	@Override
	public JsonElement serialize(TextP textp, Type arg1, JsonSerializationContext arg2) {
		
		JsonArray jobj = new JsonArray();
		jobj.add(new JsonPrimitive("Util.p")); 
		jobj.add(new JsonPrimitive(textp.getText()));
		return jobj;
		
	}
	
	@Override
	public TextP deserialize(JsonElement json, Type arg1, JsonDeserializationContext arg2) throws JsonParseException {
		JsonArray array = json.getAsJsonArray();
		TextP textp = new TextP();
		textp.setText(array.get(1).getAsString());
		return textp;
	}
	
}

private class MultiChoiceRadioTranslator implements  JsonDeserializer<MultiChoiceRadio>, JsonSerializer<MultiChoiceRadio>{
	
	@Override
	public JsonElement serialize(MultiChoiceRadio mcr, Type arg1, JsonSerializationContext arg2) {
		
		JsonArray jobj = new JsonArray();
		ArrayList<Answer> answers = mcr.getAns();
		if(answers.get(0).getAnswer() instanceof Image) jobj.add(new JsonPrimitive("mcRadioImg"));
		if(answers.get(0).getAnswer() instanceof TextAnswer) jobj.add(new JsonPrimitive("selectText"));
		jobj.add(new JsonPrimitive(mcr.getId())); 
		JsonArray subArray = new JsonArray();
		for(int i = 0; i < answers.size(); i++){
			subArray.add(new JsonPrimitive(answers.get(i).getName()));
		}
		jobj.add(subArray);
		return jobj;
		
	}
	
	@Override
	public MultiChoiceRadio deserialize(JsonElement json, Type arg1, JsonDeserializationContext arg2) throws JsonParseException {
		JsonArray array = json.getAsJsonArray();
		MultiChoiceRadio mcr = new MultiChoiceRadio();
		mcr.setId(array.get(1).getAsInt());
		ArrayList<Answer> answers = new ArrayList<>();
		JsonArray subArray = array.get(2).getAsJsonArray();
		if(subArray.get(0).getAsString().length() > 3 && subArray.get(0).getAsString().substring(subArray.get(0).getAsString().length()-3) == "jpg"){
			for(int i = 0; i < subArray.size(); i++){
				answers.add(new Answer(new Image(subArray.get(i).getAsString())));
			}
		}
		else{
			for(int i = 0; i < subArray.size(); i++){
				answers.add(new Answer(new TextAnswer(subArray.get(i).getAsString())));
			}
		}
		
		mcr.setAns(answers);
		return mcr;
	}
	
}

private class FillInTranslator implements  JsonDeserializer<FillIn>, JsonSerializer<FillIn>{
	
	@Override
	public JsonElement serialize(FillIn fillin, Type arg1, JsonSerializationContext arg2) {
		
		JsonArray jobj = new JsonArray();
		jobj.add(new JsonPrimitive("fillin")); 
		jobj.add(new JsonPrimitive(fillin.getId()));
		return jobj;
		
	}
	
	@Override
	public FillIn deserialize(JsonElement json, Type arg1, JsonDeserializationContext arg2) throws JsonParseException {
		JsonArray array = json.getAsJsonArray();
		FillIn fillin = new FillIn();
		fillin.setId(array.get(1).getAsInt());
		return fillin;
	}
	
}

private class TextSpanTranslator implements  JsonDeserializer<TextSpan>, JsonSerializer<TextSpan>{
	
	@Override
	public JsonElement serialize(TextSpan text, Type arg1, JsonSerializationContext arg2) {
		
		JsonArray jobj = new JsonArray();
		jobj.add(new JsonPrimitive("Util.span")); 
		jobj.add(new JsonPrimitive(text.getText()));
		return jobj;
		
	}
	
	@Override
	public TextSpan deserialize(JsonElement json, Type arg1, JsonDeserializationContext arg2) throws JsonParseException {
		JsonArray jobj = json.getAsJsonArray();
		TextSpan text = new TextSpan();
		text.setText(jobj.get(1).getAsString());
		return text;
	}
	
}

private class AudioTranslator implements  JsonDeserializer<Audio>, JsonSerializer<Audio>{
	
	@Override
	public JsonElement serialize(Audio audio, Type arg1, JsonSerializationContext arg2) {
		
		JsonArray jobj = new JsonArray();
		jobj.add(new JsonPrimitive("Util.audio")); 
		jobj.add(new JsonPrimitive(audio.getSource()));
		return jobj;
		
	}
	
	@Override
	public Audio deserialize(JsonElement json, Type arg1, JsonDeserializationContext arg2) throws JsonParseException {
		JsonArray jobj = json.getAsJsonArray();
		Audio audio = new Audio();
		audio.setSource(jobj.get(1).getAsString());
		return audio;
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
	
private class MatrixTranslator implements  JsonDeserializer<Matrix>, JsonSerializer<Matrix>{
		
		@Override
		public JsonElement serialize(Matrix matrix, Type arg1, JsonSerializationContext arg2) {
			JsonArray jobj = new JsonArray();
			JsonPrimitive matrixName = new JsonPrimitive("grid");
			JsonPrimitive matrixId = new JsonPrimitive(Integer.toString(matrix.getQcid())+ "_" + Integer.toString(matrix.getId()));
			JsonArray data = new JsonArray();
			for(double[] array : matrix.getData()){
				JsonArray dataArray = new JsonArray();
				for(double number : array){
					JsonPrimitive a = new JsonPrimitive(number);
					dataArray.add(a);
				}
				data.add(dataArray);
			}
			jobj.add(matrixName);
			jobj.add(matrixId);
			jobj.add(data);
			return jobj;
			
		}
		
		//TODO
		@Override
		public Matrix deserialize(JsonElement json, Type arg1, JsonDeserializationContext arg2) throws JsonParseException {
			
			JsonArray jobj = json.getAsJsonArray();
			Matrix matrix = new Matrix();
			
			int row = jobj.get(2).getAsJsonArray().size();
			int col = jobj.get(2).getAsJsonArray().get(0).getAsJsonArray().size();
			double[][] data = new double[row][col];
			for(int i = 0; i < row; i++){
				for(int j = 0; j < col; j++){
					data[i][j] = jobj.get(2).getAsJsonArray().get(i).getAsJsonArray().get(j).getAsDouble();
				}
			}
			matrix.setData(data);
			matrix.setCol(col);
			matrix.setRow(row);
			matrix.setQcid(Integer.parseInt(jobj.get(1).getAsString().substring(0, 1)));
			matrix.setId(Integer.parseInt(jobj.get(1).getAsString().substring(2, 3)));
			return matrix;
		}
		
	}
private class MatrixQuestionTranslator implements  JsonDeserializer<MatrixQuestion>, JsonSerializer<MatrixQuestion>{
	
	@Override
	public JsonElement serialize(MatrixQuestion matrixQ, Type arg1, JsonSerializationContext arg2) {
		JsonArray jobj = new JsonArray();
		JsonPrimitive matrixName = new JsonPrimitive("emptyGrid");
		JsonPrimitive matrixId = new JsonPrimitive(Integer.toString(matrixQ.getQcid())+ "_" + Integer.toString(matrixQ.getId()));
		JsonPrimitive matrixRow = new JsonPrimitive(matrixQ.getRows());
		JsonPrimitive matrixCol = new JsonPrimitive(matrixQ.getCols());
		jobj.add(matrixName);
		jobj.add(matrixId);
		jobj.add(matrixRow);
		jobj.add(matrixCol);
		return jobj;
		
	}
	
	//TODO
	@Override
	public MatrixQuestion deserialize(JsonElement json, Type arg1, JsonDeserializationContext arg2) throws JsonParseException {
		
		JsonArray jobj = json.getAsJsonArray();
		MatrixQuestion matrixQ = new MatrixQuestion();
		matrixQ.setQcid(Integer.parseInt(jobj.get(1).getAsString().substring(0, 1)));
		matrixQ.setId(Integer.parseInt(jobj.get(1).getAsString().substring(2, 3)));
		matrixQ.setRows(jobj.get(2).getAsInt());
		matrixQ.setCols(jobj.get(3).getAsInt());
		return matrixQ;
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
				klassString = (klassString.equals("Grid"))? "Matrix" : klassString;
				klassString = (klassString.equals("Util.br"))? "LineBreak" : klassString;
				klassString = (klassString.equals("EmptyGrid")) ? "MatrixQuestion" : klassString;
				klassString = (klassString.equals("Util.span")) ? "TextSpan" : klassString;
				klassString = (klassString.equals("File")) ? "FileUpload" : klassString;
				klassString = (klassString.equals("Util.image")) ? "Image" : klassString;
				klassString = (klassString.equals("Fillin"))? "FillIn" : klassString;
				klassString = (klassString.equals("Util.p"))? "TextP" : klassString;
				klassString = ((klassString.equals("SelectText"))||(klassString.equals("McRadioImg")))? "MultiChoiceRadio" : klassString;
				klassString = (klassString.equals("Util.audio"))? "Audio" : klassString;
				klassString = (klassString.equals("Util.video"))?"Video" : klassString;
				klassString = "org.adastraeducation.liquiz." + klassString;
				Class<?> klass = null;
				
				try{
					klass = Class.forName(klassString);
					System.out.println(klass);
				}catch(ClassNotFoundException e){
					e.printStackTrace();
					throw new JsonParseException(e.getMessage());
				}
				
				
				return arg2.deserialize(jsonArray, klass);
			}
			
		}
		
	}

	

