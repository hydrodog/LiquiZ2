use strict;

my $linenum = 0;
sub expect {
    my ($tag) = @_;
    $linenum++;
    my $line = <IMPORT>;
    
    if ($line =~/^$tag:/) {
	return $line;
    }
    die "$linenum: Expected $tag, found: $line\n";
}

sub buildHeader {
    my $title = expect("Title");
    my $src = expect("Source");
    my $editor = expect("LiquiZ Editor");
    my $desc = expect("Description");
    my $start = expect("startdate");
    my $end = expect("enddate");
    my $numQuestions = expect("questions");
    my $points = 100;
    my $timelimit = 0;
    my $tries = 1;
    my $dataDir = "assets/";
    print LIQUIZ <<XXX
{"title":"$title","points":$points,"timeLimit":$timelimit,
 "remainingTries":$tries,"dataDir":"$dataDir","editMode":false,
 "questions":
[
XXX
;
}


open(IMPORT, $ARGV[0]) || die("can't open $ARGV[0]\n");
open(LIQUIZ, ">$ARGV[1]") || die("can't open $ARGV[1]\n");
buildHeader();

my $line;
my $group;
my $subgroupid;
my $subgroupname;
my $subgroupdesc;
my $q;
while ($line = <IMPORT>) {
    if ($line =~ /^SUBELEMENT (\w+) - /) {
	$group = $1;
	$line = <IMPORT>;
	$line =~ /(\w+)\s+([^:]+):\s+(.*)/;
	$subgroupid = $1;
	$subgroupname = $2;
	$subgroupdesc = $3;
	print "$subgroupid: $subgroupname, $subgroupdesc\n";
	next;
    }
    if ($line =~ /^($group\w+)\s+\((\w)\)\s+\[([\d\.]+)(?:\,\s+([\d\.]+))?\]/) {
	$q = $1;
	my $ans = ord($2) - ord('A');
	my $sec1 = $3;
	my $sec2 = $4;
	print "$q $ans $sec1 $sec2\n";
	my $text = <IMPORT>;
	my $A = <IMPORT>;
	my $B = <IMPORT>;
	my $C = <IMPORT>;
	my $D = <IMPORT>;
	chomp $text;
	chomp $A;	chomp $B; 	chomp $C; 	chomp $D;
	my $end = <IMPORT>;
	my @answers = (0,0,0,0);
	$answers[$ans] = 1;
	my $answers = join(",", @answers);
	print "text: $text\n";
	print LIQUIZ <<XXX
{"id":$q,"title":"","level":"1","points":"1","content":[
     ["instructions",["$text",]],["selectText",-2,["$A", "$B", "$C", "$D"]],"answers":["A","B","C","D"],[$answers]]},
XXX
;
    }
}
close(IMPORT);
close(LIQUIZ);
